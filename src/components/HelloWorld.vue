<template>
  <div>
    <h1 class="title" style="text-align: center">My Proposals</h1>
    <div class="appbody" style="display: flex;" :style="{height: windowHeight}">
      <div class="newOne section section1" :style="{height: windowHeight}">
        <div class="sidebar">
          <form>
        <input class="headingInput" :placeholder="headingPlaceHolder" type="text" v-model="newProposal.heading" required>
        <textarea
          class="myTxt2"
          type="text"
          @keyup.ctrl.enter="AddNew"
          v-model="newProposal.myInput"
          placeholder="Enter your Proposal Here"
          required
        >
        </textarea>
        <button id="addNewBtn" type="submit" class="btn btn-primary" @click.prevent="AddNew">Add New</button>
          </form>
        </div>
      </div>

      <div class="section section2">
        <div class="main">
          <div id="proposal" v-for="(proposal, index) in proposalsList" :key="index">
            <h1 style="text-transform: capitalize;"> {{index + 1}}-  {{proposal.heading}}</h1>
            <textarea :class="['obj-' + index]" class="myTxt" :value="proposal.myInput"></textarea>
            <button id="copyBtn" class="copyImg" @click=" copyText(index)">
              <img src="@/assets/icons/icons8-copy.svg" style="width: 20px;">
            </button>
            <button id="copyBtn" class="deleteImg" @click="deleteText(index)">
              <img src="@/assets/icons/icons8-delete-bin.svg" style="width: 20px;">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      headingPlaceHolder: "Enter heading here",
      newProposal: {
        myInput: "",
        heading: ""
      },
      proposalsList: [],
    };
  },
  methods: {
    AddNew() {
      if(this.newProposal.heading.trim() == "") {
        this.headingPlaceHolder = "!Please Add heading first"
      }else if(this.newProposal.myInput.trim() == ""){
        console.log('hello fuck')
      }
      else{
        this.proposalsList.push({"myInput": this.newProposal.myInput, "heading": this.newProposal.heading});
        this.myProposal();
        this.newProposal.myInput = "";
        this.newProposal.heading = "";
      }
    },
    copyText(index) {
      var textToCopy = document.querySelector(`.obj-${index}`);
      textToCopy.select();  
      document.execCommand("copy");
    },
    deleteText(index){
      this.proposalsList.splice(index, 1)
      localStorage.setItem('storedData', JSON.stringify(this.proposalsList))
      console.log(index);
    },
    myProposal() {
      localStorage.setItem('storedData', JSON.stringify(this.proposalsList))
    }
  },
  computed: {
    windowHeight: function () {
      return `${window.innerHeight - 150}px  !important`;
    }
  },
  mounted() {
    if(localStorage.storedData) {
      this.proposalsList = JSON.parse(localStorage.getItem("storedData"));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #2c3e50; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

.appbody {
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
}

.section1 {
  width: 40%;
  overflow: hidden;
  height: 450px;
  display: flex;
  /* justify-content: center; */
  padding: 10px;
}
.sidebar{
  width: 90%;
}
.section2 {
  width: 60%;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 999;
  height: 100%;
  padding-right: 50px;
}
.main {
  display: grid;
  grid-template-columns: auto auto;
}
#proposal{
  display: flex;
  flex-direction: column ;
  justify-content: center;
  padding: 10px;
  position: relative;
}

.headingInput {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    border-color: #2c3e50;
    border: 3px solid;
    border-bottom: 0;
    font-size: 15px;
    font-weight: 900;
    font-family: system-ui;
    text-transform: capitalize;
}

.myTxt {
  font-family: monospace;
  border: 3px solid rgb(43, 62, 80);
  padding: 15px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
}
.myTxt2 {
  font-family: monospace;
  border: 3px solid rgb(43, 62, 80);
  padding: 15px;
  width: 100%; 
  height: 200px; 
  box-sizing: border-box;
}

#addNewBtn {
    width: 100%;
    border: 0;
    background: #2c3e50;
    color: #fff;
    font-size: 30px;
    font-family: monospace;
    text-transform: uppercase;
    cursor: pointer;
    padding: 15px;
    margin-top: -4px;
}
button#copyBtn {
    position: absolute;
    right: 10px;
    background: #2c3e50;
    color: #fff;
    padding: 5px 8px;
    border-color: black;
}
button.deleteImg {
    position: absolute;
    left: 10px;
    bottom: 10px;
    background: #2c3e50;
    color: #fff;
    padding: 5px 8px;
    border-color: black;
}
</style>
