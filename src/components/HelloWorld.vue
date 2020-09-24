<template>
  <div>
    <h1 class="title" style="text-align: center">My Proposals</h1>
    <div class="appbody" style="display: flex;" :style="{height: windowHeight}">

      <!-- Add New Proposal  -->
       
      <div class="newOne section section1" :style="{height: windowHeight}">
        <div class="sidebar">
          <form>
            <input
              class="headingInput"
              :class="{headingMissing: headingMissing}"
              :placeholder="headingPlaceHolder"
              type="text"
              v-model="newProposal.heading"
              required
            />
            <textarea
              class="myTxt2"
              :class="{inputMissing: inputMissing}"
              type="text"
              @keyup.ctrl.enter="AddNew"
              v-model="newProposal.myInput"
              placeholder="Enter your Proposal Here"
              required
            ></textarea>
            <button
              id="addNewBtn"
              type="submit"
              class="btn btn-primary"
              @click.prevent="AddNew"
            >Add New</button>
          </form>
        </div>
      </div>


      <!-- Saved Proposals  -->

      <div class="section section2">
        <draggable  class="main" v-model="proposalsList"  @start="dragging=true" @end="updateAccordingToSorting"> 
          <!-- <div> -->
            <div id="proposal" v-for="(proposal, index) in proposalsList" :key="index">
              <h1 class="singleProposalHeading" title="Drag">
                <!-- <span style="font-size: 12px;">{{index + 1}})</span> -->
                {{proposal.heading}}
              </h1>
              <textarea class="myTxt" 
                :class="['obj-' + index]" 
                v-model="proposal.myInput"
                @keyup="proposal.showUpdateBtn = true "
              ></textarea>
              <button id="copyBtn" class="copyImg" title="Copy" @click="copyText(index)">
                <img src="@/assets/icons/icons8-copy.svg" style="width: 20px;" /> Copy
              </button>
              <button id="copyBtn" class="deleteImg" title="Delete" @click="deleteText(index)">
                <img src="@/assets/icons/icons8-delete-bin.svg" style="width: 20px;" /> Delete
              </button>
              <button id="copyBtn" class="update" title="Update" v-show="proposal.showUpdateBtn" @click="updateProposal(index)">
                <img src="@/assets/icons/icons8-save.svg" style="width: 20px;" /> Update
              </button>
            </div>
          <!-- </div>           -->
        </draggable>
      </div>

      <!-- saved proposals end here  -->

    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "HelloWorld",
  components: {draggable},
  data() {
    return {
      headingPlaceHolder: "Enter heading here",
      headingMissing: false,
      inputMissing: false,
      newProposal: {
        myInput: "",
        heading: "",
        showUpdateBtn: false,
      },
      proposalsList: [],
    };
  },

  methods: {
    AddNew() {
      // Checking if the Input Fields are filled 
      if (this.newProposal.heading.trim() == "") {
        this.headingPlaceHolder = "!Please Add heading first";
        this.headingMissing = true;
      }else if(this.newProposal.myInput.trim() == ""){
        this.inputMissing = true;
      }else {
        this.proposalsList.push({ 
          myInput: this.newProposal.myInput,
          heading: this.newProposal.heading,
          showUpdateBtn: this.newProposal.showUpdateBtn
        });

        // Resetting All Values
        this.myProposal();
        this.newProposal.myInput = "";
        this.newProposal.heading = "";
        this.inputMissing = false;
        this.headingMissing = false;
      }
    },
    updateAccordingToSorting(){
      localStorage.setItem("storedData", JSON.stringify(this.proposalsList));
    },
    copyText(index) {
      var textToCopy = document.querySelector(`.obj-${index}`);
      textToCopy.select();
      document.execCommand("copy");
    },
    deleteText(index) {
      this.proposalsList.splice(index, 1);
      localStorage.setItem("storedData", JSON.stringify(this.proposalsList));
    },
    updateProposal(index) {
      this.proposalsList[index].showUpdateBtn = false
      localStorage.setItem("storedData", JSON.stringify(this.proposalsList));
    },
    myProposal() {
      localStorage.setItem("storedData", JSON.stringify(this.proposalsList));
    },
  },

  computed: {
    windowHeight: function () {
      return `${window.innerHeight - 150}px  !important`;
    },
  },

  mounted() {
    if (localStorage.storedData) {
      this.proposalsList = JSON.parse(localStorage.getItem("storedData"));
    }
  },
};
</script>

<style scoped>
  @import '../css/style.css';
</style>
