<template>
  <div class="application">
    <div class="main-button"><c-button type="success" @click.native="getData">Получить данные</c-button></div>
    <c-table :raw-table-data="rawTableData" :columns="columns" :loading="loading" :row-callback="showModal"/>
    <c-modal v-model="modalIsShown">
      <template v-slot:header>
        Детальная информация
      </template>
      <template v-slot:body>
        <div class="detail-info">
          <div class="detail-info__item">
            <h3 class="detail-info__item-title">Полное имя</h3>
            <div class="detail-info__item-content">{{modalContent.fullname}}</div>
          </div>
          <div class="detail-info__item">
            <h3 class="detail-info__item-title">Адрес</h3>
            <div class="detail-info__item-content">
              <p><b>Штат:</b> {{modalContent.address.state}}</p>
              <p><b>Город:</b> {{modalContent.address.city}}</p>
              <p><b>Улица:</b> {{modalContent.address.streetAddress}}</p>
              <p><b>ZIP:</b> {{modalContent.address.zip}}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
      
      </template>
    </c-modal>
  </div>
</template>

<script>
  import addresses from '@/assets/bd.js'
  
  export default {
    name: 'App',
    data() {
      return {
        rawTableData: [],
        columns: [
          {
            name: 'Полное имя',
            id: 'fullname',
            path: ['fullname']
          }, {
            name: 'Имя пользователя',
            id: 'uname',
            path: ['uname']
          }, {
            name: 'Компания',
            id: 'company',
            path: ['company']
          }, {
            name: 'Email',
            id: 'email',
            path: ['email']
          }, {
            name: 'Штат',
            id: 'state',
            path: ['address', 'state']
          },
        ],
        modalContent: undefined,
        modalIsShown: false,
        url: 'http://www.filltext.com/?rows=1000&id={index}&fullname={firstName}~{lastName}&company={business}&email={email}&uname={username}&address={addressObject}',
        loading: false
      }
    },
    mounted() {
      // if (this.rawTableData.length === 0) {
      //   this.rawTableData = addresses
      // }
    },
    methods: {
      showModal(entity) {
        this.modalIsShown = true
        this.modalContent = entity
      },
      getData() {
        this.loading = true
        this.$axios.get(this.url).then(result => {
          this.rawTableData = result.data
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  .detail-info {
    &__item {
      display: flex;
      align-items: baseline;
    }
    &__item-title {
      width: 150px;
      margin-right: 20px;
    }
    &__item-content {
    
    }
  }
  .main-button {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
