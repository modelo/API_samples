const ModelComments = {
    Monitor1: '人员记录',
    Monitor2: '水压水流',
    Monitor3: '环境监控',
    Monitor4: '配电控制',
    Monitor5: '水位监测'
};

const PanelDataColType = {
    Text: 'text',
    Icon: 'icon',
    Form: 'form',
    Direction: 'direction'
}

const ControlList = [
    {
      id: 0,
      icon: './svg/staff-record.svg',
      title: '人员记录',
      view: ModelComments.Monitor1,
      panelElements: ['q1xqW2YJ+0/100013'],
      noCircle: false,
      panelData: [
        {
          lineDirection: 'left',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'record',
                  label: '人员进出记录',
                  colType: PanelDataColType.Form
                },
                {
                  key: 'time',
                  label: '10/2019',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  record: {
                    label: '开门时长',
                    value: '15m'
                  },
                  time: '13:18:34 10/11/19'
                },
                {
                  record: {
                    label: '开门时长',
                    value: '15m'
                  },
                  time: '14:18:34 10/11/19'
                },
                {
                  record: {
                    label: '开门时长',
                    value: '30m'
                  },
                  time: '15:18:34 10/11/19'
                },
                {
                  record: {
                    label: '开门时长',
                    value: '19m'
                  },
                  time: '16:18:34 10/11/19'
                },
                {
                  record: {
                    label: '开门时长',
                    value: '26m'
                  },
                  time: '17:18:34 10/11/19'
                },
                {
                  record: {
                    label: '开门时长',
                    value: '3m'
                  },
                  time: '18:18:34 10/11/19'
                },
                {
                  record: {
                    label: '开门时长',
                    value: '25m'
                  },
                  time: '19:18:34 10/11/19'
                },
                {
                  record: {
                    label: '开门时长',
                    value: '51m'
                  },
                  time: '20:18:34 10/11/19'
                }
              ]
            },
            width: 350,
            height: 450
          }
        }
      ]
    },
    {
      id: 1,
      icon: './svg/water-pressure.svg',
      title: '水压水流',
      view: ModelComments.Monitor2,
      noCircle: false,
      panelElements: [
        'q1xqW2YJ+0/100036',
        'q1xqW2YJ+0/100080',
        'q1xqW2YJ+0/100113',
        'q1xqW2YJ+0/100146'
      ],
      panelData: [
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '水泵',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'unit',
                  label: 'ml',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '水压',
                  unit: '30pa'
                },
                {
                  name: '水流',
                  unit: '0.8'
                },
                {
                  name: '振动',
                  unit: '正常'
                }
              ]
            },
            width: 150,
            height: 200
          }
        },
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '水泵',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'unit',
                  label: 'ml',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '水压',
                  unit: '30pa'
                },
                {
                  name: '水流',
                  unit: '0.8'
                },
                {
                  name: '振动',
                  unit: '正常'
                }
              ]
            },
            width: 150,
            height: 200
          }
        },
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '水泵',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'unit',
                  label: 'ml',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '水压',
                  unit: '30pa'
                },
                {
                  name: '水流',
                  unit: '0.8'
                },
                {
                  name: '振动',
                  unit: '正常'
                }
              ]
            },
            width: 150,
            height: 200
          }
        },
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '水泵',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'unit',
                  label: 'ml',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '水压',
                  unit: '30pa'
                },
                {
                  name: '水流',
                  unit: '0.8'
                },
                {
                  name: '振动',
                  unit: '正常'
                }
              ]
            },
            width: 150,
            height: 200
          }
        }
      ]
    },
    {
      id: 2,
      icon: './svg/environment-monitor.svg',
      title: '环境监控',
      view: ModelComments.Monitor3,
      noCircle: true,
      panelElements: [
        
      ],
      panelData: [
        {
          lineDirection: '',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'label',
                  label: '室内环境监测',
                  colType: PanelDataColType.Form
                },
                {
                  key: 'unit',
                  label: '',
                  colType: PanelDataColType.Direction
                }
              ],
              dataList: [
                {
                  label: {
                    label: '室内温度',
                    value: '24'
                  },
                  unit: 'direction--up'
                },
                {
                  label: {
                    label: '室内光线',
                    value: '150 lux'
                  },
                  unit: 'direction--down'
                },
                {
                  label: {
                    label: '室内湿度',
                    value: '60%'
                  },
                  unit: 'direction--up'
                },
                {
                  label: {
                    label: '室内漏水',
                    value: 'N / a'
                  },
                  unit: 'direction--common'
                }
              ]
            },
            width: 300,
            height: 250
          }
        }
      ]
    },
    {
      id: 3,
      icon: './svg/electric-monitor.svg',
      title: '配电控制',
      view: ModelComments.Monitor4,
      noCircle: false,
      panelElements: [
        ['q1xqW2YJ+0/100218', 'q1xqW2YJ+0/100219'],
        [
          'q1xqW2YJ+0/100212',
          'q1xqW2YJ+0/100213',
          'q1xqW2YJ+0/100214',
          'q1xqW2YJ+0/100215',
          'q1xqW2YJ+0/100216',
          'q1xqW2YJ+0/100217'
        ],
        [
          'q1xqW2YJ+0/100206',
          'q1xqW2YJ+0/100207',
          'q1xqW2YJ+0/100208',
          'q1xqW2YJ+0/100209',
          'q1xqW2YJ+0/100210',
          'q1xqW2YJ+0/100211'
        ],
        [
          'q1xqW2YJ+0/100200',
          'q1xqW2YJ+0/100201',
          'q1xqW2YJ+0/100202',
          'q1xqW2YJ+0/100203',
          'q1xqW2YJ+0/100204',
          'q1xqW2YJ+0/100205',
        ],
        [
          'q1xqW2YJ+0/100195',
          'q1xqW2YJ+0/100196',
          'q1xqW2YJ+0/100197',
          'q1xqW2YJ+0/100198',
          'q1xqW2YJ+0/100199',
        ]
      ],
      panelData: [
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '配电柜',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'value',
                  label: 'sl',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '电流',
                  value: '30A'
                },
                {
                  name: '状态',
                  value: '正常'
                }
              ]
            },
            width: 150,
            height: 150
          }
        },
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '配电柜',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'value',
                  label: 'sl',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '电流',
                  value: '30A'
                },
                {
                  name: '状态',
                  value: '正常'
                }
              ]
            },
            width: 150,
            height: 150
          }
        },
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '配电柜',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'value',
                  label: 'sl',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '电流',
                  value: '30A'
                },
                {
                  name: '状态',
                  value: '正常'
                }
              ]
            },
            width: 150,
            height: 150
          }
        },
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '配电柜',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'value',
                  label: 'sl',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '电流',
                  value: '30A'
                },
                {
                  name: '状态',
                  value: '正常'
                }
              ]
            },
            width: 150,
            height: 150
          }
        },
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '配电柜',
                  colType: PanelDataColType.Text
                },
                {
                  key: 'value',
                  label: 'sl',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: '电流',
                  value: '30A'
                },
                {
                  name: '状态',
                  value: '正常'
                }
              ]
            },
            width: 150,
            height: 150
          }
        }
      ]
    },
    {
      id: 4,
      icon: './svg/valve-control.svg',
      title: '水位监测',
      view: ModelComments.Monitor5,
      noCircle: false,
      panelElements: [
        ['q1xqW2YJ+0/100029',
        'q1xqW2YJ+0/100030',
        'q1xqW2YJ+0/100031',
        'q1xqW2YJ+0/100032']
      ],
      panelData: [
        {
          lineDirection: 'top',
          panelContent: {
            type: 'table',
            data: {
              headers: [
                {
                  key: 'name',
                  label: '水位监测',
                  colType: PanelDataColType.Direction
                },
                {
                  key: 'value',
                  label: '',
                  colType: PanelDataColType.Text
                }
              ],
              dataList: [
                {
                  name: 'direction--progress',
                  value: '2.0m'
                }
              ]
            },
            width: 140,
            height: 120
          }
        }
      ]
    }
  ];