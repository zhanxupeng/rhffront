<template>
  <div>
    <Menu active-name="1-2" :open-names="['1']">
      <template v-for="item in menuList">
        <submenu-system :item="item"></submenu-system>
      </template>
    </Menu>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        menuList: [{
            subMenuName: '1',
            subMenuTitle: 'Navigation One',
            type: 'ios-filing',
            itemList: [{
                name: '1-1',
                label: 'Option 1-1'
              },
              {
                name: '1-2',
                label: 'Option 1-2'
              },
              {
                name: '1-3',
                label: 'Option 1-3'
              }
            ],
            children: null
          },
          {
            subMenuName: '2',
            subMenuTitle: 'Navigation Two',
            type: 'ios-filing',
            itemList: [{
                name: '2-1',
                label: 'Option 2-1'
              },
              {
                name: '2-2',
                label: 'Option 2-2'
              },
              {
                name: '2-3',
                label: 'Option 2-3'
              }
            ],
            children: {
              subMenuName: '2-1-c',
              subMenuTitle: 'Navigation Two One',
              itemList: [{
                  name: '2-1-1',
                  label: 'Option 2-1-1'
                },
                {
                  name: '2-1-2',
                  label: 'Option 2-1-2'
                },
                {
                  name: '2-1-3',
                  label: 'Option 2-1-3'
                }
              ],
              children: {
                subMenuName: '2-1-1-c',
                subMenuTitle: 'Two One One',
                itemList: [{
                    name: '2-1-1-1',
                    label: 'Option 2-1-1-1'
                  },
                  {
                    name: '2-1-1-2',
                    label: 'Option 2-1-1-2'
                  }
                ],
                children: {
                  subMenuName: '2-1-1-1-c',
                  subMenuTitle: '你妹',
                  itemList: [{
                      name: '2-1-1-1-1',
                      label: '2-1-1-1-1'
                    },
                    {
                      name: '2-1-1-2-2',
                      label: '2-1-1-1-2'
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    }
  }
</script>