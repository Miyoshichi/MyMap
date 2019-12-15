<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="50"
            sm="10"
            md="70"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="cyan lighten-2"
                dark
                flat
              >
                <v-toolbar-title>Upload Form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                    <img width="25%" v-if="uploadImageUrl" :src="uploadImageUrl" />
                    <br>
                    <!--場所入力開始-->
                    <v-list-item>
                        <v-col
                            cols="20"
                            md="4"
                            >
                            <v-text-field
                                v-model="place"
                                id="place"
                                label="place"
                                name="place"
                                type="name"
                            /></v-col>
                            <v-col
                            cols="12"
                            md="4"
                            >
                                <v-text-field
                                    v-model="latitude"
                                    id="latitude"
                                    name="latitude"
                                    label="latitude"
                                ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            md="4"
                            >
                                <v-text-field
                                    v-model="longitude"
                                    id="longitude"
                                    label="longitude"
                                    name="longitude"
                                ></v-text-field>
                            </v-col>
                        </v-list-item>
                        <!--場所入力終了-->
                       <p class="text-left">Category</p>
                        <v-combobox
                        v-model="selectedCategory"
                        :filter="filter"
                        :hide-no-data="!search"
                        :items="categories"
                        :search-input.sync="search"
                        hide-selected
                        label="Search for tags"
                        multiple
                        small-chips
                        solo
                        >
                        <template v-slot:no-data>
                            <v-list-item>
                            <span class="subheading">Create</span>
                            <v-chip
                                :color="`${colors[nonce - 1]} lighten-3`"
                                label
                                small
                            >
                                {{ search }}
                            </v-chip>
                            </v-list-item>
                        </template>
                        <template v-slot:selection="{ attrs, item, parent, selected }">
                            <v-chip
                            v-if="item === Object(item)"
                            v-bind="attrs"
                            :color="`${item.color} lighten-3`"
                            :input-value="selected"
                            label
                            small
                            >
                            <span class="pr-2">
                                {{ item.text }}
                            </span>
                            <v-icon
                                small
                                @click="parent.selectItem(item)"
                            >close</v-icon>
                            </v-chip>
                        </template>
                        <template v-slot:item="{ index, item }">
                            <v-text-field
                            v-if="editing === item"
                            v-model="editing.text"
                            autofocus
                            flat
                            background-color="transparent"
                            hide-details
                            solo
                            @keyup.enter="editCategory(index, item)"
                            ></v-text-field>
                            <v-chip
                            v-else
                            :color="`${item.color} lighten-3`"
                            dark
                            label
                            small
                            >
                            {{ item.text }}
                            </v-chip>
                            <v-spacer></v-spacer>
                            <v-list-item-action @click.stop>
                            <v-btn
                                icon
                                @click.stop.prevent="edit(index, item)"
                            >
                                <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                            </v-btn>
                            </v-list-item-action>
                        </template>
                        </v-combobox>
<!--タグ開始-->
<p class="text-left">Tag</p>
<v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="Search for tags"
      multiple
      small-chips
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip
            :color="`${colors[nonce - 1]} lighten-3`"
            label
            small
          >
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.text }}
          </span>
          <v-icon
            small
            @click="parent.selectItem(item)"
          >close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip
          v-else
          :color="`${item.color} lighten-3`"
          dark
          label
          small
        >
          {{ item.text }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn
            icon
            @click.stop.prevent="edit(index, item)"
          >
            <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  <!--タグ終了-->
                 
                  <br>
                  <v-file-input
            v-model="input_image"
            accept="image/*"
            show-size
            label="Upload a picture"
            prepend-icon="mdi-image"
            @change="onImagePicked"
          ></v-file-input>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-row align="center" >
                <v-btn color="primary" @click="save_pin">Done!!</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import localStorage from '../utils/localstorage'
  export default {
       data() {
    return {
        user: null,
      input_video: null,
      input_image: null,
      uploadVideoUrl: '',
      uploadImageUrl: '',

       todoId: 0,
    todoTitle: "",
    editTodoTitle: "",
    drawer: null,
    editTodoId: null,
    todos: [],
    dialog: "",
    latitude:"",
    longitude:"",
    place: "",
    
    save:[],

    //タグ開始
    activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      index: -1,
      items: [
        { header: 'Select an option or create one' },
        {
          text: 'Foo',
          color: 'blue',
        },
        {
          text: 'Bar',
          color: 'red',
        },
      ],
      nonce: 1,
      menu: false,
      model: [
        {
          text: 'Foo',
          color: 'blue',
        },
      ],
      selectedCategory: [],
      categories: [],
      x: 0,
      search: null,
      y: 0,
      //タグ終了

    }
  },
  created() {
      this.user = localStorage.get('user')
  },
    props: {
      source: String,
    },

//タグ開始
 watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }

            this.items.push(v)

            this.nonce++
          }

          return v
        })
      },
      selectedCategory (val, prev) {
        if (val.length === prev.length) return

        if(typeof val[val.length - 1] === "object") {
            this.selectedCategory = [val[val.length - 1]]
            return
        }
        this.selectedCategory = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }

            this.categories.push(v)

            this.nonce++

            return v
          }
        }).filter(Boolean)
      }
      
    },

//タグ終了
    //タグ開始
    methods: {
        onImagePicked(file) {
            if (file !== undefined && file !== null) {
                if (file.name.lastIndexOf('.') <= 0) {
                return
                }
                const fr = new FileReader()
                fr.readAsDataURL(file)
                fr.addEventListener('load', () => {
                this.uploadImageUrl = fr.result
                })
            } else {
                this.uploadImageUrl = ''
            }
        },
      edit (index, item) {
          console.log(item)
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      },
      editCategory (index, item) {
          console.log(item)
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },

      save_pin(){
          let pins = !localStorage.get("pins") ? [] : localStorage.get("pins") 
          pins.push({
              place: this.place,
              latitude: this.latitude,
              longitude: this.longitude,
              selectedCategory: this.selectedCategory,
              tags: this.model,
              user: this.user
          })
          localStorage.set('pins', pins)
          alert('You added new pin!')
          this.$router.push('/')
      }
    },
  //タグ終了
    
  }
</script>


