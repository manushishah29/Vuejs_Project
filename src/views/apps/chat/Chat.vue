<template>

  <div style="height: inherit">


    <!-- Main Area -->
    <section class="chat-app-window height">

      <!-- Chat Content -->
      <div

          class="active-chat"
      >
        <!-- Chat Navbar -->
        <div class="chat-navbar">
          <header class="chat-header">

            <b><h1>Messages</h1></b>


            <!-- Contact Actions -->
            <div class="d-flex align-items-center">
              <feather-icon
                  icon="PaperclipIcon"
                  size="20"
                  class="cursor-pointer d-sm-block d-none mr-50"
                  @click="toggleFileChatModal"

              />
              <template>
                <div class="dropdown">
                  <b-dropdown
                      variant="link"
                      no-caret
                      toggle-class="p-0"
                      right
                  >
                    <template #button-content>
                      <feather-icon
                          icon="FilterIcon"
                          size="20"
                          class="cursor-pointer align-middle text-body"
                      />
                    </template>
                    <b-dropdown-item
                        class="cursor-pointer"
                        :active="requestData.filterBy===getFilterBy.ALL"
                        @click="filtersAll(getFilterBy.ALL)"
                    >
                      All
                    </b-dropdown-item>

                    <b-dropdown-item class="cursor-pointer"
                                     :active="requestData.filterBy===getFilterBy.DOCUMENT"
                                     @click="filtersAll(getFilterBy.DOCUMENT)"
                    >
                      Documents
                    </b-dropdown-item>
                    <b-dropdown-item class="cursor-pointer"
                                     :active="requestData.filterBy===getFilterBy.MESSAGE"
                                     @click="filtersAll(getFilterBy.MESSAGE)"
                    >
                      Messages
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>
            </div>
          </header>
        </div>


        <section
            id="chat-box"
            class="user-chats scroll-area scroll-y"
            :class="chatInputMessage.length > 2000 ? 'character-error' : ''"
            infinite-wrapper
        >
          <infinite-loading
              ref="infiniteLoadingRef"
              direction="top"
              :identifier="scrollIdentifer"
              force-use-infinite-wrapper
              @infinite="loadMoreChatMessage"
          >
          </infinite-loading>


          <!--            <infinite-loading direction="top" force-use-infinite-wrapper=".infinite-wrapper" @infinite="getAllMessage"/>-->
          <div class="chats"
               v-for="(msg,index) in this.msgData"
               :key="index"
          >

            <div
                v-if="msg.userId===requestData.userId"
                class="chat"
                :class="{'chat-right': msgData}"
            >

              <div class="chat-avatar">
                <b-avatar
                    size="30"
                    class="avatar-border-2 box-shadow-1 badge-primary mr-1 "
                    :text="$fn().splitUserName(msg.userName)"
                    variant="transparent"
                ></b-avatar>
              </div>

              <div class="chat-body">
                <div class="chat-content">

                  <p>{{ msg.userName }} {{
                      $fn()
                          .dateToMoment(msg.createdAt, 'MM/DD/YY h:mm A')
                    }}</p>
                  <p>{{ msg.message }}
                    <feather-icon
                        v-if="msg.type==='DOCUMENT'"
                        @click="downloadFileData(msg.fileId)"
                        icon="DownloadIcon"
                        class=" mer-1 cursor-pointer "
                        size="15"
                    />
                    <feather-icon
                        v-if="msg.type==='DOCUMENT'"
                        icon="EyeIcon"
                        @click="openReadDocumentModal(msg)"
                        class="mr-1 cursor-pointer "
                        size="15"
                    />
                    <feather-icon
                        icon="Trash2Icon"
                        @click="openDeleteChatModal(msg.id)"
                        class=" mr-1 cursor-pointer "
                        size="15"
                    />
                    <feather-icon
                        icon="EditIcon"
                        @click="openEditChatModal(msg)"
                        class=" mr-1 cursor-pointer "
                        size="15"
                    />
                  </p>


                </div>

              </div>

            </div>
            <div
                v-else
                class="chat"
                :class="{'chat-left': msgData}"
            >

              <div class="chat-avatar">
                <b-avatar
                    size="30"
                    class="avatar-border-2 box-shadow-1 badge-secondary mr-1 "
                    :text="$fn().splitUserName(msg.userName)"
                    variant="transparent"
                ></b-avatar>
              </div>

              <div class="chat-body">
                <div class="chat-content">

                  <p>{{ msg.userName }} {{
                      $fn()
                          .dateToMoment(msg.createdAt, 'MM/DD/YY h:mm A')
                    }}</p>
                  <p>{{ msg.message }}
                    <feather-icon
                        v-if="msg.type==='DOCUMENT'"
                        @click="downloadFileData(msg.fileId)"
                        icon="DownloadIcon"
                        class="cursor-pointer "
                        size="15"
                    />
                    <feather-icon
                        v-if="msg.type==='DOCUMENT'"
                        @click="openReadDocumentModal(msg)"
                        icon="EyeIcon"
                        class=" cursor-pointer "
                        size="15"
                    />
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>


        <b-form
            class="chat-app-form "
        >
          <b-input-group class="input-group-merge form-send-message mr-1">
            <b-form-input
                v-model="chatInputMessage"
                placeholder="Enter your message"
            />
          </b-input-group>
          <b-button
              variant="primary"
              @click="getSendMessage"
          >Send
          </b-button>
        </b-form>
      </div>
    </section>
    <show-file-chat-modal
        v-if="showFileChatModal"
        :show-file-chat-modal="showFileChatModal"
        :current-folder-id="currentFolderId"
        @insert-file-modal="getAllMessage"
        @close-modal="toggleFileChatModal"
    />
    <read-file-modal
        v-if="readFileModal"
        :read-file-modal="readFileModal"
        :view-file-details="viewFileDetails"
        :file-id="fileId"
        @close-modal="toggleReadDocumentModal"
    />
    <show-edit-chat-modal
        v-if="showEditChatModal"
        :message-data="messageData"
        :message-id="messageId"
        :show-edit-chat-modal="showEditChatModal"
        @update-message="getAllMessage"
        @close-modal="toggleEditChatModal"
    />

    <b-modal
        v-model="showModal"
        centered
        size="sm"
        title="Confirm?"
        @hide="closeModal"
    >
      <div>Are You Sure You Want to Delete?</div>
      <template #modal-footer>
        <div>
          <b-button @click="deleteMessageDetails" variant="primary" class="mr-1" size="sm">
            Yes
          </b-button>
          <b-button @click="closeModal" size="sm">No</b-button>
        </div>
      </template>

    </b-modal>
  </div>
</template>

<script>
import {
  ref
} from '@vue/composition-api'
import {
  BAvatar, BDropdown, BDropdownItem, BForm, BInputGroup, BFormInput, BButton, BFormGroup,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import {
  deleteMessage,
  downloadFile,
  fetchMessage,
  sendMessage,

} from '@/views/pages/authentication/services/login'
import * as $fn from '@/helper/vue-helper'
import { getFilterBy } from '@/views/apps/chat/chatems'
import showFileChatModal from '@/views/apps/chat/fileChatModal.vue'
import { extractFileFormat } from '@/helper/vue-helper'
import readFileModal from '@/views/apps/document/readFileModal.vue'
import showEditChatModal from '@/views/apps/chat/editChatModal.vue'
import InfiniteLoading from 'vue-infinite-loading'


export default {
  computed: {
    getFilterBy() {
      return getFilterBy
    }
  },
  components: {


    // BSV
    BAvatar,
    BDropdown,
    BDropdownItem,
    BForm,
    BInputGroup,
    BFormInput,
    BButton,
    BFormGroup,
    VuePerfectScrollbar,
    InfiniteLoading,
    showEditChatModal,
    showFileChatModal,
    readFileModal,
  },

  data() {
    // const refChatLogPS = ref(null)
    // const activeChat = ref({})
    // const perfectScrollbarSettings = {
    //   maxScrollbarLength: 150,
    // }
    return {
      $refs: {
        showFileChatModal,
        readFileModal,
        showEditChatModal,

      },
      requestData: {
        filterBy: getFilterBy.ALL,
        pageNo: 0,
        pageSize: 10,
        userId: parseInt(localStorage.getItem('userId')),

      },
      // reqData: {
      //   message:this.messageData
      // },
      type: '',
      currentFolderId: 0,
      messageDetails: null,
      displayImageFormat: ['jpg', 'png', 'ico'],
      displayPdfFormat: ['pdf'],
      displayTextFormat: ['txt', 'csv', 'html', 'json', 'xml'],
      msgData: [],
      chatInputMessage: '',
      userName: '',
      messageId:0,
      messageData:'',
      fileId: '',
      lastPage:false,
      firstPage:false,
      isMessageLoading: true,
      checkForUnreadMessage:true,
      scrollIdentifer: new Date(),
      totalMessages: 0,

      viewFileDetails: {
        isImage: false,
        fileId: null,
        isPdfFile: false,
        isText: false,
        fileExtension: '',
        isWebSupportedFile: false,
      },
      showFileChatModal: false,
      showDeleteChatModal: false,
      readFileModal: false,
      fileDetails: null,
      showModal:false,
      showEditChatModal:false,
      showFolderChatModal:false,

      // refChatLogPS,
      // activeChat,
      // perfectScrollbarSettings,
    }
  },
  beforeMount() {
    // this.intervalId = setInterval(() => {
    //   fetchMessage({
    //     ...this.requestData,
    //     pageNo: 0,
    //   }).then((response) => {
    //     if (
    //         response.data.data &&
    //         response.data.data.totalElements !== this.totalMessages
    //     ) {
    //       this.requestData.pageNo = 0;
    //       this.lastPage = response.data.data.last;
    //       this.firstPage = response.data.data.first;
    //       this.msgData = response.data.data.content.reverse();
    //       this.scrollIdentifer = new Date();
    //       this.totalMessages = response.data.data.totalElements;
    //       const chatApp = document.getElementById("chat-box");
    //       this.setLoader();
    //       this.$nextTick(() => chatApp.scrollTo(0, chatApp.scrollHeight));
    //     }
    //   });
    // }, 30000);
  },
  methods: {

    $fn() {
      return $fn
    },
    getSendMessage() {
      const requestData = {
        message: this.chatInputMessage,
      }
      sendMessage(requestData)
          .then(response => {
            this.chatInputMessage = ''
            this.getAllMessage()
            this.$toast.success('Send Message Successfully')

          })
          .catch(e => {
            console.log(e)
          })
    },
    // setLoader() {
    //   if (this.lastPage && this.firstPage) {
    //     this.isMessageLoading = false;
    //   } else {
    //     this.isMessageLoading = true;
    //   }
    // },
    loadMoreChatMessage($state) {
      console.log('this.lastPage',this.lastPage)
      if (!this.lastPage) {
        console.log('this.lastPage',this.lastPage)
        this.loadChatMessages($state);
      }
    },
    loadChatMessages($state) {
      fetchMessage(this.requestData)
          .then((response) => {
            if (response.data) {
              this.lastPage = response.data.data.last;
              console.log('this.lastPage',this.lastPage)
              this.requestData.pageNo += 1;
              this.msgData.unshift(...response.data.data.content.reverse());
              // const chatApp = document.getElementById("chat-box");
              // this.setLoader();
              this.lastPage ? $state.complete() : $state.loaded();
              // if (this.isUnreadMessageAvailable) {
              //   this.$nextTick(() => chatApp.scrollTo(0, 0));
              //   this.isUnreadMessageAvailable = false;
              // } else if (this.lastPage && response.data.data.first) {
              //   this.$nextTick(() => chatApp.scrollTo(0, chatApp.scrollHeight));
              // }
            }
          })
          .catch((e) => {
            console.log(e)
          });
    },
    getAllMessage() {
      this.requestData.pageSize = 10;
      this.requestData.pageNo = 0;
      fetchMessage(this.requestData)
          .then(response => {
            if (response.data) {
              // this.msgData = response.data.data.content.reverse();
              this.lastPage = response.data.data.last;
              this.firstPage = response.data.data.first;
              if (!this.lastPage) {
                this.requestData.pageNo += 1;
              }
              this.msgData = response.data.data.content.reverse();
              // this.scrollIdentifer = new Date();
              this.totalMessages = response.data.data.totalElements;
              // const chatApp = document.getElementById("chat-box");
              // this.setLoader();
              // this.$nextTick(() => chatApp.scrollTo(0, chatApp.scrollHeight));
            }
          })
          .catch((e) => {
            console.log(e)
          });
    },
    downloadFileData(id) {
      downloadFile({ id })
          .then(response => {
            if (response?.data) {
              window.open(response.data.data)
            }

          })
          .catch(e => {
            console.log(e)
          })

    },
    deleteMessageDetails() {
      deleteMessage(this.messageId)
          .then((response) => {
            if (response) {
              this.closeModal()
              this.$toast.success('Message Deleted SuccessFully')
              this.getAllMessage()
            }
          })
          .catch(e => {
            console.log(e)
          })
    },

    openDeleteChatModal(messId) {
      this.showModal=true
      this.messageId=messId
      console.log('messId',messId)
    },
    openEditChatModal(data){
      this.showEditChatModal=true
      this.messageId=data.id
      this.messageData=data.message
      console.log('this.message',this.messageData)
    },
    closeModal() {
      this.showModal=false
    },

    filtersAll(value) {
      this.requestData.filterBy = value
      this.getAllMessage()
    },
    toggleFileChatModal() {
      this.showFileChatModal = !this.showFileChatModal
    },
    toggleReadDocumentModal() {
      this.readFileModal = false
      this.viewFileDetails.isImage = false
      this.viewFileDetails.isPdfFile = false
      this.viewFileDetails.isText = false
      this.viewFileDetails.isWebSupportedFile = false
    },
    toggleEditChatModal(){
      this.showEditChatModal=!this.showEditChatModal
    },
    openReadDocumentModal(fileDetails) {
      this.viewFileDetails.fileId = fileDetails.fileId
      console.log('fileDetails.message', fileDetails.message)
      const fileExtension = extractFileFormat(fileDetails.message)

      if (this.displayImageFormat.includes(fileExtension)) {
        this.viewFileDetails.isImage = true
        this.viewFileDetails.fileExtension = fileExtension
        this.readFileModal = true
      } else if (this.displayPdfFormat.includes(fileExtension)) {
        this.viewFileDetails.isPdfFile = true
        this.viewFileDetails.fileExtension = fileExtension
        this.readFileModal = true
      } else if (this.displayTextFormat.includes(fileExtension)) {
        this.viewFileDetails.isText = true
        this.viewFileDetails.fileExtensions = fileExtension
        this.readFileModal = true
      } else if (this.displayTextFormat.includes(fileExtension)) {
        this.viewFileDetails.isWebSupportedFile = true
        this.viewFileDetails.fileExtensions = fileExtension
        this.readFileModal = true
      } else {
        this.$toast.error('Format is not supported')
      }
    }

  },
}
</script>


<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";

.scroll-y {
  overflow-y: scroll !important;
}
.infinite-status-prompt {
  padding: 10px 0px;
}
.height{
  height: 550px !important;
}


</style>
