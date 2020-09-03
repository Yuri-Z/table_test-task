<template>
  <div class="table">
    <div class="table__navigation">
      <div class="table__search">
        <label class="table__search-label">
          <input class="table__search-input"
                 type="text"
                 ref="search"
                 @keydown.enter="runSearch"
                 @keydown.esc="dropSearch"
          >
        </label>
        <c-button class="table__button" @click.native="runSearch" type="primary">Найти</c-button>
        <c-button class="table__button" @click.native="dropSearch" type="danger">Сбросить</c-button>
      </div>
      <div class="table__pagination">
        <label class="table__page-size">
          <span>Количество строк на странице: </span>
          <input class="table__page-size-input" type="number" v-model="size">
        </label>
        <c-button v-for="(item, index) in buttons"
                  class="table__button"
                  :class="{'table__button': true, 'table__button_disabled': item.status}"
                  type="info"
                  :key="index"
                  @click.native="changePage(item.id)"
        >
          <span>{{item.value}}</span>
        </c-button>
      </div>
    </div>
    <table class="table__body">
      <tr class="table__header">
        <th v-for="(item, index) in columns"
            class="table__cell"
            :key="index"
            @click="toggleColumnSort(item.id)"
        >
          {{item.name}}
          <div v-if="item.id === sort.id" class="table__sort-direction">
            <div v-if="sort.direction === 'asc'">↓</div>
            <div v-if="sort.direction === 'desc'">↑</div>
          </div>
        </th>
      </tr>
      <tr v-if="loading">
        <td :colspan="columns.length" style="text-align: center">
          <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif" alt="">
        </td>
      </tr>
      <tbody v-else>
      <tr v-if="rawTableData.length === 0">
        <td :colspan="columns.length" style="text-align: center">Таблица пуста. Данные не загружены.</td>
      </tr>
      <tr v-for="(entity, index) in pageContent"
          :key="index"
          class="table__row"
          @click="rowCallback(rawTableData[size*(pageNumber-1)+index])"
      >
        <td class="table__cell" v-for="(item, index2) in entity" :key="index2">{{item}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Table",
    props: {
      rawTableData: {required: true, type: Array},
      columns: {required: true},
      rowCallback: {
        default: () => {
        }
      },
      loading: {type: Boolean}
    },
    data() {
      return {
        pageNumber: 1,
        size: 20,
        sort: {
          id: undefined,
          direction: 0
        },
        search: '',
      }
    },
    computed: {
      pageCount() {
        if (this.size > 0) {
          return Math.ceil((this.filteredAndSortedTableData.length) / this.size)
        } else {
          return 1
        }
      },
      tableData() {
        return this.rawTableData.map(item => {
          const result = {}
          const loop = (object, path) => {
            if (path.length === 1) {
              return object[path[0]]
            } else {
              return loop(object[path[0]], path.slice(1))
            }
          }
          this.columns.forEach(({id, path}) => {
            result[id] = loop(item, path)
          })
          return result
        })
      },
      filteredTableData() {
        const result = []
        if (this.search.length !== 0) {
          for (let i = 0; i < this.tableData.length; i++) {
            if (Object.values(this.tableData[i]).filter(value => (value.toString().match(this.search) !== null)).length) {
              result.push(this.tableData[i])
            }
          }
        } else {
          result.push(...this.tableData)
        }
        return result
      },
      filteredAndSortedTableData() {
        const result = [...this.filteredTableData]
        if (this.sort.direction === 0) {
          return result
        } else {
          const id = this.sort.id
          for (let i = 0; i < result.length; i++) {
            let finest = i
            for (let j = i + 1; j < result.length; j++) {
              switch (this.sort.direction) {
                case 'asc':
                  if (result[j][id].toString().toLowerCase() < result[finest][id].toString().toLowerCase()) finest = j
                  break
                case 'desc':
                  if (result[j][id].toString().toLowerCase() > result[finest][id].toString().toLowerCase()) finest = j
              }
            }
            let temp = result[finest]
            result[finest] = result[i]
            result[i] = temp
          }
          return result
        }
      },
      pageContent() {
        if (this.size > 0) {
          const size = parseInt(this.size)
          const firstItem = (this.pageNumber - 1) * size
          const lastItem = firstItem + size
          
          return this.filteredAndSortedTableData.slice(firstItem, lastItem)
        } else {
          return this.filteredAndSortedTableData
        }
      },
      buttons() {
        return [
          {
            id: 1,
            value: '<<',
            status: this.pageNumber <= 2
          }, {
            id: 2,
            value: '<',
            status: this.pageNumber === 1
          }, {
            id: 3,
            value: this.pageNumber,
            status: true
          }, {
            id: 4,
            value: '>',
            status: this.pageNumber >= this.pageCount
          }, {
            id: 5,
            value: '>>',
            status: this.pageNumber >= this.pageCount - 1
          }
        ]
      }
    },
    methods: {
      changePage(id) {
        switch (id) {
          case 1: {
            this.pageNumber = 1
            break
          }
          case 2: {
            this.pageNumber -= 1
            break
          }
          case 3: {
            
            break
          }
          case 4: {
            this.pageNumber += 1
            break
          }
          case 5: {
            this.pageNumber = this.pageCount
            break
          }
        }
      },
      toggleColumnSort(id) {
        if (this.sort.id === id) {
          switch (this.sort.direction) {
            case 0:
              this.sort.direction = 'asc'
              break
            case 'asc':
              this.sort.direction = 'desc'
              break
            case 'desc':
              this.sort.direction = 0
              break
          }
        } else {
          this.sort = {
            id,
            direction: 'asc'
          }
        }
      },
      runSearch() {
        this.search = this.$refs.search.value
      },
      dropSearch() {
        this.search = ''
        this.$refs.search.value = ''
      },
    },
    watch: {
      size(newValue) {
        if (newValue < 0 || isNaN(newValue)) this.size = 0
        if (newValue > 999) this.size = 999
        this.pageNumber = 1
      },
    }
  }
</script>

<style lang="scss">
  .table {
    background-color: #fff;
    
    &__search {
      & > * + * {
        margin-left: 12px;
      }
    }
    
    &__navigation {
      display: flex;
      justify-content: space-between;
    }
    
    &__pagination {
      & > * + * {
        margin-left: 12px;
      }
    }
    
    &__page-size {
    }
    
    &__page-size-input {
      width: 40px;
    }
    
    &__button {
      padding: 8px 16px;
      
      &_disabled {
        pointer-events: none;
        opacity: 0.7;
      }
    }
    
    &__body {
      width: 100%;
    }
    
    &__header {
      background-color: #888888;
      color: #f0f0f0;
      cursor: pointer;
    }
    
    &__sort-direction {
      display: inline-block;
    }
    
    &__row {
      opacity: 0.8;
      cursor: default;
      
      &:hover {
        opacity: 1;
      }
      
      &:nth-child(even) {
        background-color: lightgrey;
      }
      
      &:nth-child(odd) {
        background-color: #f0f0f0;
      }
    }
    
    &__cell {
      padding: 4px 8px;
      
    }
    
  }
</style>