<template>
  <div class="best">
    aaaaaa
  </div>
</template>

<script>
import { ApiLogin } from "../../../api/login";
export default {
  name: "best",
  data() {
    return {
      loginForm: {
        userCode: "1",
        password: "2",
        rdm: "3"
      },
      ard: [1, 2, 3],
      address: 234
    };
  },
  mounted() {
    window.console.log(this.ard);
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      let param = { address: that.address };
      ApiLogin(param).then(res => {
        window.console.log(res);
      });
    }
  }
};
</script>
