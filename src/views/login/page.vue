<template>
    <div class="login">
        <el-main>
					<el-form  @keyup.enter.native="loginFun()" :rules="loginFormRules" ref="loginForm" :model="loginForm">
            <div class="loginLogo">
					    <img src="./imgs/logo.png" alt="">
              <span>物产云商统一登录平台</span>
            </div>
            <el-form-item>
              <p class="loginText">登录</p>
						</el-form-item>
						<el-form-item prop="userCode">
							<el-input placeholder="用户名" v-model="loginForm.userCode" clearable ></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input type="password" placeholder="密码" v-model="loginForm.password" clearable show-password></el-input>
						</el-form-item>
            <el-form-item prop="rdm">
							<el-input placeholder="请输入验证码" v-model="loginForm.rdm" clearable show-password>
                <img slot="append" :src="rdmImg" class="rdmImg" width="68px" height="22px" @click="rdmInit" title="点击刷新"/> 
              </el-input>
						</el-form-item>
						<el-form-item>
							<el-button class="submit" @click="loginFun()">登录</el-button>
						</el-form-item>
            <div class="loginBottomText">
              <p>浙ICP备I3002655号-3, Copyright 2017 ZJMI EC ALL rights reserved.</p>
            </div>
					</el-form>
        </el-main>
        <el-footer></el-footer>
    </div>    
</template>
<script>
import { ApiLogin } from "../../api/login";
export default {
  data() {
    return {
      loginForm: {
        userCode: "",
        password: "",
        rdm: ""
      },
      rdmImg: "",
      loginFormRules: {
        userCode: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        rdm: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginFun() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          // const loading = this.$loading({
          //   lock: true,
          //   text: "Loading",
          //   spinner: "el-icon-loading",
          //   background: "rgba(0, 0, 0, 0.7)"
          // });
          // ApiLogin({
          //   ...this.loginForm
          // })
          //   .then(async res => {
          //     if (res.code == "200") {
          //       sessionStorage.setItem("sessionId", res.data.sessionId);
          this.$router.push("/");
          //   } else {
          //     this.rdmInit();
          //   }
          //   loading.close();
          // })
        }
      });
    },
    rdmInit() {
      this.rdmImg =
        window.rootData.ROOT_SERVER + "/authimg.img?" + new Date().getTime();
    }
  },
  created() {
    this.rdmInit();
  }
};
</script>
<style lang="scss" scoped>
.rdmImg {
  cursor: pointer;
}
.login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("./imgs/background.png") no-repeat center;
  min-width: 1200px;
  overflow-x: auto;
}
.el-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 15px;
  width: 360px;
  height: 410px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
}
.loginLogo {
  position: absolute;
  top: -68px;
  left: 0px;
  img {
    height: 46px;
    vertical-align: middle;
    margin-right: 5px;
  }
  span {
    font-size: 27px;
    /* font-weight: 600; */
    color: white;
    vertical-align: middle;
  }
}
.loginBottomText {
  position: absolute;
  bottom: -36px;
  left: -10px;
  p {
    font-size: 12px;
    color: rgba(254, 254, 254, 1);
  }
  line-height: 17px;
  width: 404px;
  white-space: nowrap;
}
.loginText {
  font-size: 20px;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  line-height: 28px;
  text-align: left;
}
.el-form-item {
  margin: 0px auto;
  position: relative;
  margin-bottom: 25px;
  i {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    font-size: 23px;
    color: #cccccc;
  }
  .submit {
    color: white;
    border: none;
    outline: none;
    font-size: 16px;
    margin: 20px auto;
    width: 330px;
    height: 50px;
    background: linear-gradient(
      135deg,
      rgba(101, 180, 255, 1) 0%,
      rgba(64, 87, 232, 1) 100%
    );
    border-radius: 3px;
  }
  .submit:hover {
    opacity: 0.8;
  }
}
</style>
<style lang="scss">
.login {
  .el-input--suffix .el-input__inner {
    height: 50px;
    line-height: 50px;
    background: rgba(32, 53, 128, 0.01);
    border-radius: 3px;
    border: 1px solid rgba(32, 53, 128, 0.16);
  }
}
</style>
