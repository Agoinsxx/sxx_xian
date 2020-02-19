<template>
  <div class="Layout">
    <HeadNav />
    <router-view></router-view>
  </div>
</template>

<script>
import HeadNav from '../components/Nav/index'

export default {
  name: 'Layout',
  components: {
   HeadNav
  }
}
</script>
