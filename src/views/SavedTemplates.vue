<template>
  <div id="savedTemplates" class="container-fluid">
    <h1 class="text-center">Variable Proposal text</h1>
    <div class="row mt-5">
      <div class="col-md-3 new-proposal-box">
        <form @submit.prevent="addProposal()">
          <div class="form-group">
            <small id="heading_help" class="form-text text-muted">
              Start by adding a cool Heading
            </small>
            <input
              type="text"
              class="form-control"
              id="proposal_heading"
              aria-describedby="heading_help"
              v-model="newProposal[1].heading"
              required
            />
          </div>

          <div
            class="form-group"
            v-for="(textBox, textBoxKey) in newProposal[1].proposalBody"
            :key="textBoxKey"
          >
            <!-- <input
              type="text"
              class="form-control"
              v-model="textBox.heading"
              placeholder="Variable Name"
              v-show="textBox.type == 'var'"
            /> -->
            <small class="form-text text-muted">
              {{textBox.heading}}
            </small>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              v-model="textBox.textarea"
              required
            ></textarea>
          </div>

          <div
            class="addNewElement text-primary text-center position-relative my-2"
          >
            <div class="addIcon" @click="showtooltip = !showtooltip">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </div>
            <!-- <transition name="showTooltip"> -->
              <div class="module-tooltip" v-show="showtooltip">
                <div class="tooltip-arrow"></div>
                <div class="tooltip-header">
                  <div
                    class="btn-group btn-block"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" class="btn btn-dark">Elements</button>
                    <button type="button" class="btn btn-dark">Saved</button>
                  </div>
                </div>
                <div class="tooltip-content">
                  <button
                    class="btn btn-primary btn-block"
                    @click.prevent="addSimpleTextBox()"
                  >
                    Add Simple Text
                  </button>
                    <button
                    class="btn btn-success btn-block"                    
                    v-b-modal.variableTextModal
                    @click.prevent
                  >
                    Add Variable Text
                  </button>
                </div>
              </div>
            <!-- </transition> -->
            
            <!-- Modal -->
              <b-modal id="variableTextModal" centered scrollable size="xl" title="Variable Text">
                <div class="row">
                  <div class="col-md-3">
                    <p class="text-Primary">Add New Variable Text</p>
                    <div class="form-group">
                      <input type="text" class="form-control mb-2" v-model="newVariable.heading">
                      <textarea class="form-control mb-2" rows="10" v-model="newVariable.textarea"></textarea>
                      <button class="btn btn-primary btn-block" @click="addVarTextBox()">Add to list and insert</button>
                      <button class="btn btn-success btn-block" @click="addVarToList()">Add to list</button>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <p class="text-success text-center">Saved Variables</p>
                    <div class="row">
                      <div class="col-md-6" v-for="(variableText, vIndex) in variablesList" :key="vIndex">
                        <div class="form-group">
                          <small class="text-muted">
                            {{variableText.heading}}
                          </small>
                          <textarea class="form-control" v-model="variableText.textarea" rows="5"></textarea>
                          <button class="btn btn-dark btn-block mt-2" @click="insertVariables(vIndex)">Insert</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-modal>
          </div>
          <button class="btn btn-block btn-dark mt-4" type="submit">Add</button>
        </form>
      </div>

      <!-- Edit variables second col  -->
      <div class="col-md-3">
        <div class="row" v-show="variablesList.length > 0">
          <div class="col-md-12">
            <p class="text-center text-primary">Edit Variables</p>
            <div class="form-group" v-for="(variable, variableIndex) in variablesList" :key="variableIndex">
              <small class="form-text text-muted">
                {{variable.heading}}
              </small>
              <textarea class="form-control" name="variableTextBox" rows="5" style="width: 100%" v-model="variable.textarea"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Saved Proposals  third col -->
      <div class="col-md-6">
        <div class="row">
          <div
            class="col-md-6 form-group"
            v-for="(proposal, proposalIndex) in proposalsList"
            :key="proposalIndex"
          >
            <input
              type="text"
              class="form-control"
              v-model="proposal.heading"
            />
            <textarea
              class="form-control"
              name="singleProposal"
              rows="5"
              v-model="proposal.text"
              style="width: 100%"
            ></textarea>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "SavedTemplate",
  data: () => ({
    showtooltip: false,
    newProposal: [{ heading: null }, { proposalBody: [{ textarea: "" }] }],
    proposalsList: [],
    newVariable: {heading: '', textarea: '', type: 'var'},
    variablesList: [

    ],
  }),
  methods: {
    addSimpleTextBox() {
      var newProposalTextBoxes = this.newProposal[1].proposalBody;
      newProposalTextBoxes.push({ textarea: "" });
      this.showtooltip = !this.showtooltip;
      // console.log(this.newProposal[1]);
    },

    addVarTextBox() {
      var newProposalTextBoxes = this.newProposal[1].proposalBody;
      newProposalTextBoxes.push(this.newVariable);
      this.variablesList.push(this.newVariable)
      this.newVariable =  {heading: '', textarea: '', type: 'var'}
      // console.log(this.newProposal[1]);
    },

    insertVariables(vIndex){
      var newProposalTextBoxes = this.newProposal[1].proposalBody;
      newProposalTextBoxes.push(this.variablesList[vIndex]);
    },

    addVarToList(){
      this.variablesList.push(this.newVariable)
      this.newVariable =  {heading: '', textarea: '', type: 'var'}
    },

    addProposal() {
      var proposals = this.newProposal[1].proposalBody;
      var text = "";
      proposals.forEach((proposal) => {
        text = text + proposal.textarea + "\n";
      });
      this.proposalsList.push({
        heading: this.newProposal[1].heading,
        text: text,
      });
      this.newProposal = [{ heading: null }, { proposalBody: [{ textarea: "" }] }]
      // console.log(text);
    },
  },
};
</script>

<style lang="scss">
.addIcon {
  svg {
    cursor: pointer;
    background: #fff;
    width: 25px;
    fill: var(--primary);
    transition: all 0.3s;
    &:hover {
      fill: var(--dark);
      transform: scale(1.2);
    }
  }
}

.module-tooltip {
  background: #fff;
  border: 1px solid var(--dark);
  margin: 0 auto;
  width: 60%;
  margin-top: 15px;
  transition: all 0.3s ease-in;
}

.tooltip-arrow {
  width: 10px;
  height: 10px;
  border: 1px solid var(--dark);
  position: absolute;
  transform: rotate(45deg);
  background: var(--dark);
  text-align: center;
  top: 35px;
  margin: 0 auto;
  border-right: 0;
  border-bottom: 0;
  left: 49%;
}

.tooltip-header {
  .btn {
    border-radius: 0;
    width: 50%;
  }
}

.tooltip-content {
  padding: 20px;
}

// animating tooltip  
.showTooltip-enter, .list-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0; 
}

.showTooltip-enter-active {
  transition: all 0.3s;
}

</style>
