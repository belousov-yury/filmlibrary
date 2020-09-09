<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            h1.ui-title-2 Hello banner
          .auth__form
            span.ui-title-2 Login
            form(@submit.prevent="onSubmit")
              .form-item(
                :class="{errorInput: $v.email.$error}"
              )
                input(
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  :class="{error: $v.email.$error}"
                  @change="$v.email.$touch()"
                )
                .error(v-if="!$v.email.required") Email is required
                .error(v-if="!$v.email.email") Email is not correct
              .form-item(
                :class="{errorInput: $v.password.$error}"
              )
                input(
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :class="{error: $v.password.$error}"
                  @change="$v.password.$touch()"
                )
                .error(v-if="!$v.password.minLength")
                  | Password must have at least {{ $v.password.$params.minLength.min }} letters.
              .button-list
                button.button.button-primary(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                ) Login
              .button-list.button-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
              .button-list.button-list--info
                span Need registration?
                  router-link(to="/registration")  Enter here
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      // this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log('Login!')
        // do your submit logic here
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.auth
  display flex
.auth_banner,
.auth_form
  width 50%
.form-item
  .error
    display none
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
  &.errorInput
    .error
      display block
input
  &.error
    border-color #fc5c65
    animation shakeX .5s
.button-list
  text-align right
  margin-bottom 20px
  button
    border-radius 15px
  &.buttons-list--info
    text-align center
    &.last-child
      margin-bottom 0
a
  color #444ce0
</style>
