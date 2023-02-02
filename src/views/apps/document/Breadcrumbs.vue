<template>
  <div>
    <div class="content-header row">
      <div class="content-header-left col-md-12 col-12 mb-2">
        <div class="row breadcrumbs-top mt-2">
          <div class="col-9">
            <h2 class="content-header-title border-0 md-2">Documents</h2>
          </div>
        </div>
        <div class="row">
          <div
              v-if="breadcrumbDetails && breadcrumbDetails.length > 0"
              class="breadcrumb-wrapper"
          >
            <b-breadcrumb>
              <b-breadcrumb-item @click="homeDir">
                <feather-icon
                    icon="HomeIcon"
                    size="16"
                    class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                  v-for="item in breadcrumbDetails"
                  :key="item.id"
                  :active="item.isActive"
                  @click="openBreadCrumbFolder(item.id)"
              >
                {{ item.folderName }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
export default {
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  props: {
    currentFolderId: {
      type: Number,
      required: true,
    },
    breadcrumbDetails: {
      type: Array,
      required: true,
    },
    isRootDir: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    // getAllList() {
    //   this.$emit("fetch-documents", this.isRootDir ? 0 : this.currentFolderId);
    // },
    homeDir() {
      this.$emit("fetch-documents", 0, true);
    },
    openBreadCrumbFolder(folderId) {
      this.$emit("remove-breadcrumb-after-id", folderId);
      this.$emit("fetch-documents", folderId);
    },
  },
};
</script>
