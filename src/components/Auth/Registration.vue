<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            h1.ui-title-2 Hello banner
          .auth__form
            span.ui-title-2 Registration
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
              .form-item(
                :class="{errorInput: $v.repeatPassword.$error}"
              )
                input(
                  type="password"
                  placeholder="Repeat your password"
                  v-model="repeatPassword"
                  :class="{error: $v.repeatPassword.$error}"
                  @change="$v.repeatPassword .$touch()"
                )
                .error(v-if="!$v.repeatPassword.sameAsPassword") Passwords must be identical.
              .button-list
                button.button.button-primary(
                  type="submit"
                  )
                  span(v-if="loading") Loading...
                  span(v-else) Registration
              .button-list.button-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-else) {{ submitStatus }}
              .button-list.button-list--info
                span.button-list--info-span Do you have account?
                  router-link(to="/login")  Enter here
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
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
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      // this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registrationUser', user)
          .then(() => {
            console.log('REGISTER!')
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
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
    animation shakeX .5s
  &.errorInput
    .error
      display block
input
  &.error
    border-color #fc5c65
.button-list
  text-align right
  margin-bottom 20px
  button
    border-radius 15px
  &.buttons-list--info
    text-align center
    &.last-child
        margin-bottom 0
.button-list--info-span
  font-size 16px
a
  color #444ce0
.typo__p
  font-size 14px
  color #fc5c65
</style>
