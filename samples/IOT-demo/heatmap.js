class ModeloHeatmap {
    constructor(viewer, heatmapConfig, outlineInfo) {
        this.viewer = viewer;
        this.outlineInfo = outlineInfo;
        this.heatmapConfig = {
            ...heatmapConfig,
            min: outlineInfo.min,
            max: outlineInfo.max,
            dia: this.subtract(outlineInfo.max, outlineInfo.min)
        };
        this.maskImage = this.getMaskImage();
    }

    subtract(pt1, pt2) {
        const res = [];
        res[0] = pt1[0] - pt2[0];
        res[1] = pt1[1] - pt2[1];
        res[2] = pt1[2] - pt2[2];
        return res;
    }

    length(pt) {
        return Math.sqrt(pt[0] * pt[0] + pt[1] * pt[1] + pt[2] * pt[2]);
    }

    getCoord(point) {
        const res = [];
        const tmp = this.subtract(point, this.heatmapConfig.min);
        res[0] = tmp[0] / this.heatmapConfig.dia[0];
        res[1] = 1.0 - tmp[1] / this.heatmapConfig.dia[1];

        res[0] = res[0] * this.heatmapConfig.width / this.heatmapConfig.gridSizeX;
        res[1] = res[1] * this.heatmapConfig.height / this.heatmapConfig.gridSizeY;
        return res;
    }

    drawPolyline(points, color, left, topPixel, ctx) {
        let region = new Path2D();
        let point = points[0];
        let coord = this.getCoord(point);
        coord[0] += left;
        coord[1] += topPixel;
        region.moveTo(coord[0], coord[1]);
        for (let j = 1; j < points.length; j++) {
            point = points[j];
            coord = this.getCoord(point);
            coord[0] += left;
            coord[1] += topPixel;
            region.lineTo(coord[0], coord[1]);
        }
        region.closePath();
        ctx.fillStyle = color;
        ctx.fill(region);
    }

    // generate mask image according to the outline of each floor with canvas2D.
    getMaskImage() {
        const canvas = document.getElementById('volume');
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.heatmapConfig.width, this.heatmapConfig.height);

        for (const key in this.outlineInfo) {
            const arr = key.split('-');
            const bottom = parseInt(arr[0]);
            let top = parseInt(arr[0]);
            if (arr.length == 2) {
                top = parseInt(arr[1]);
            }
            const outline = this.outlineInfo[key];
            for (let i = bottom - 1; i < top; i++) {
                const row = Math.floor(i / this.heatmapConfig.gridSizeX);
                const col = i % this.heatmapConfig.gridSizeX;

                const leftPixel = col * this.heatmapConfig.width / this.heatmapConfig.gridSizeX;
                const topPixel = row * this.heatmapConfig.height / this.heatmapConfig.gridSizeY;

                this.drawPolyline(outline.outerLoop, 'white', leftPixel, topPixel, ctx);

                outline.innerLoop.forEach((points) => {
                    this.drawPolyline(points, 'black', leftPixel, topPixel, ctx);
                });
            }
        }
        return canvas.toDataURL('image/png');
    }

    base64ToArrayBuffer(base64) {
        const binary_string = window.atob(base64.split(',')[1]);
        const len = binary_string.length;
        const bytes = new Float32Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }

    renderModeloMultiVolume(gridSize, data, width, height, position, scale) {
        const volume = new Modelo.View.Visualize.MultiLayerVolume(this.viewer.getRenderScene());
        this.viewer.getScene().addVisualize(volume);
        volume.setParameter("platteImage", "./svg/warm.png");
        volume.setParameter("gridSize", gridSize); // indicates the heatmap layout of each floor.
        volume.setParameter("data", {
            "data": data,
            "width": width,
            "height": height
        });
        volume.setPosition(position);
        volume.setParameter("maskImage", this.maskImage); // The mask image, make tiny difference to this building because it's an almost cuboid.
        volume.setParameter("layers", this.heatmapConfig.layers); // total floor numbers of the building.
        volume.setScaling(scale);
        volume.setEnabled(true);
        return volume;
    }

    renderModeloHeatmap(randomVolumeData) {
        const heatmap = new Modelo.View.Visualize.HeatMap(this.viewer.getRenderScene());
        this.viewer.getScene().addVisualize(heatmap);
        heatmap.setParameter("width", 128);
        heatmap.setParameter("height", 128);
        heatmap.setParameter("gridSize", 16);

        /****** Generate heatmap data for each floor *****/
        let imageDatas = [];
        for (let i = 0; i < this.heatmapConfig.layers; i++) {
            const data = [];
            for (let j = 0; j < 20; j++) {
                data[j] = {
                    x: Math.random(),
                    y: Math.random(),
                    number: Math.random() * 10
                }
            }
            heatmap.setParameter("points", data);
            const imageData = heatmap.getImageData();
            imageDatas.push(new Float32Array(imageData));
        }
        for (let i = 0; i < this.heatmapConfig.gridSizeY; i++) {
            for (let j = 0; j < this.heatmapConfig.gridSizeX; j++) {
            if (i * 8 + j >= this.heatmapConfig.layers) {
                continue;
            }
            for (let ii = 0; ii < 128; ii++) {
                for (let jj = 0; jj < 128; jj++) {
                    randomVolumeData[i * 128 * 128 * 8 + ii * 128 * 8 + j * 128 + jj] = imageDatas[i * 8 + j][ii * 128 + jj] * 0.8;
                    if (i == 0 && j == 0) {
                        randomVolumeData[i * 128 * 128 * 8 + ii * 128 * 8 + j * 128 + jj] = 1;
                    }
                }
            }
            }
        }
        /****** Generate heatmap data for each floor *****/

        const center = [(this.heatmapConfig.min[0] + this.heatmapConfig.max[0]) / 2, (this.heatmapConfig.min[1] + this.heatmapConfig.max[1]) / 2, (this.heatmapConfig.min[2] + this.heatmapConfig.max[2]) / 2];
        return this.renderModeloMultiVolume(
            [this.heatmapConfig.gridSizeX, this.heatmapConfig.gridSizeY],
            randomVolumeData,
            this.heatmapConfig.width,
            this.heatmapConfig.height,
            center.map(i => i / 304),
            [this.heatmapConfig.dia[0], this.heatmapConfig.dia[1], this.heatmapConfig.dia[2]].map(i => i /304)
        );
    }
}





