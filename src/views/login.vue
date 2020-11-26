<template>
    <div class="login-wrapper" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Вход в систему</span>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="form-item" :class="{error: getError('email')}">
                        <label>Логин</label>
                        <el-input 
                            name="email"
                            data-vv-name="email"
                            type="text" 
                            v-validate="'required'" 
                            v-model="form.email"
                        />
                        <span class="error-message" v-if="getError('email')">{{getError('email')}}</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-item" :class="{error: getError('login')}">
                        <label>Пароль</label>
                        <el-input 
                            name="password"
                            data-vv-name="пароль"
                            type="password" 
                            v-validate="'required'"
                            v-model="form.password"
                            @keyup.native.enter="submit"
                        />
                        <span class="error-message" v-if="getError('login')">{{getError('login')}}</span>
                    </div>
                </div>
                <div class="col-12 text-left">
                    <el-button type="info" :loading="loading" @click="submit" plain>Войти в систему</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>

export default {
    
    name: 'login',
    data() {
        return {
            loading: false,
            form: {
                email: '',
                password: ''
            }
        }
    },

    methods: {

        submit() {
            this.$validator.validateAll().then(async isValid => {

                if (!isValid) {
                    return
                }

                this.loading = true
                this.$store.dispatch('login', this.form)
                    .then(res => {
                        if (res.success) {
                            if (this.$route.query.length > 0) {
                               this.$router.replace(this.$route.query.from)
                            } else {
                               this.$router.push("/tickets/list")
                            }
                        } else {
                            this.$notify({
                                title: 'Ошибка авторизации',
                                message: res.message,
                                type: 'error'
                            })
                        }
                    })
                    .finally(() => this.loading = false)
            })
        },

        getError(fieldName) {
            return this.errors.first(fieldName)
        },
    }
}
</script>

<style lang="scss">
    .login-wrapper {
        position: relative;
        padding: 20px;
        z-index: 1;
        .box-card {
            min-width: 350px;
            max-width: 600px;
            text-align: left;
        }
    }
</style>
