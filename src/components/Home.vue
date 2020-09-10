<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
        input(
          type="text"
          placeholder="What we will watch"
          v-model="taskTitle"
          @keyup.enter="newTask"
        )
        textarea(
          type="text"
          placeholder="Description"
          v-model="taskDescription"
          @keyup.enter="newTask"
        )
        .option-list
          input.what-watch--radio(
            type="radio"
            id="radioFilm"
            value="Film"
            v-model="whatWatch"
          )
          label(
            for="radioFilm"
          ) Film
          input.what-watch--radio(
            type="radio"
            id="radioSerial"
            value="Serial"
            v-model="whatWatch"
          )
          label(
            for="radioSerial"
          ) Serial
        .total-time
          //Film Time
          .total-time__film(
            v-if="whatWatch === 'Film'"
          )
            span.time-title Hours
            input.time-input(
            type="number"
            v-model="filmHours"
            )
            input.time-input(
              type="number"
              v-model="filmMinutes"
            )
            p {{ filmTime }}
          //Serial Time
          .total-time__serial(
            v-if="whatWatch === 'Serial'"
          )
            span.time-title How many season?
            input.time-input(
              type="number"
              v-model="serialSeason"
            )
            span.time-title How many series?
            input.time-input(
              type="number"
              v-model="serialSeries"
            )
            span.time-title How long is one series (minutes)?
            input.time-input(
              type="number"
              v-model="serialSeriesMinutes"
            )
            p {{ serialTime }}
        // TAG LIST
        // Add New Tag
        .tag-list.tag-list--add
          .ui-tag__wrapper(
            @click="tagMenuShow = !tagMenuShow"
          )
            .ui-tag
              span.tag-title Add New
              span.button-close(
                :class="{active: !tagMenuShow}"
              )
        //Show Input
        .tag-list
          transition(
            mode="in-out"
            leave-active-class="animate__animated animate__fadeOutRight animate__faster"
            enter-active-class="animate__animated animate__fadeInRight animate__faster"
          )
            .tag-list--menu(
              v-if="tagMenuShow"
            )
              input.tag-add--input(
                type="text"
                placeholder="New tag"
                v-model="tagTitle"
                @keyup.enter="newTag"
              )
              .button.button-default(
                @click="newTag"
              ) Send
        // All Tags
        .tag-list
          transition-group(
            leave-active-class="animate__animated animate__fadeOutDown animate__faster out-animation"
            enter-active-class="animate__animated animate__fadeInRight animate__faster"
          )
            .ui-tag__wrapper(
             v-for="tag in tags"
             :key="tag.title"
            )
             .ui-tag(
               @click="addTagUsed(tag)"
               :class="{used: tag.use}"
               )
               span.tag-title {{ tag.title }}
               span.button-close(
                @click="deleteTag(tag.title)"
               )
        .button_wrapper
          .button.button-default(
            @click="newTask"
          ) Send
</template>

<script>
export default {
  data () {
    return {
      // Total Time
      // Films
      filmHours: 1,
      filmMinutes: 30,
      // Serials
      serialSeason: 1,
      serialSeries: 11,
      serialSeriesMinutes: 40,
      //
      taskTitle: '',
      taskDescription: '',
      whatWatch: 'Film',
      // Tags
      tagMenuShow: false,
      tagTitle: '',
      tagsUsed: []
    }
  },
  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return
      }
      let isTag = false
      for (let i = 0; i < this.$store.getters.tags.length; i++) {
        if (this.$store.getters.tags[i].title === this.tagTitle) {
          isTag = true
        }
      }
      if (isTag) {
        this.tagTitle = ''
        return
      }
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch('newTag', tag)
      this.tagTitle = ''
    },
    deleteTag (title) {
      this.$store.dispatch('deleteTag', title)
    },
    newTask () {
      if (this.taskTitle !== '') {
        let time
        if (this.whatWatch === 'Film') {
          time = this.filmTime
        } else {
          time = this.serialTime
        }
        const task = {
          title: this.taskTitle,
          description: this.taskDescription,
          whatWatch: this.whatWatch,
          time,
          tags: this.tagsUsed,
          completed: false,
          editing: false
        }
        this.$store.dispatch('newTask', task)
        // Reset
        this.taskTitle = ''
        this.taskDescription = ''
        this.tagsUsed = []
        for (let i = 0; i < this.tags.length; i++) {
          this.tags[i].use = false
        }
      }
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' Hours ' + min + ' Minutes'
    },
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use === true) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else {
        this.tagsUsed.splice(this.tagsUsed.indexOf(tag.title), 1)
      }
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    },
    filmTime () {
      let min = this.filmHours * 60 + this.filmMinutes
      return this.getHoursAndMinutes(min)
    },
    serialTime () {
      let min = this.serialSeason * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMinutes(min)
    }
  }
}
</script>

<style lang="stylus" scoped>
.option-list
  display flex
  .what-watch--radio
    margin-right 10px
    margin-top 5px
  label
    margin-right 20px
    &:last-child
      margin-bottom 0px
// Total Time
.total-time
  margin-bottom 20px
.time-title
  display block
  margin-bottom 6px
.time-input
  max-width 70px
  margin-right 10px
// Tags
.tag-list
  margin-bottom 20px
.ui-tag__wrapper
  transition all .5s
  margin-right 18px
  margin-bottom 10px
  &:last-child
    margin-right 1px
.ui-tag
  .button-close
    &.active
      transform: rotate(45deg)
  &.used
    background-color #444ce0
    color #fff
    .button-close
      &:before,
      &:after
        background-color #fff
  cursor pointer
// Tags menu show
.tag-list--menu
  display flex
  justify-content space-between
  align-items center
// new Tag Input
.tag-add--input
  margin-bottom 0px
  margin-right 10px
  height 42px
.button-default
  background-color #444ce0
  color #fff
  //margin-left 80%
  //margin-right 10%
  border-radius 15px
.button_wrapper
  display flex
  justify-content flex-end
</style>
