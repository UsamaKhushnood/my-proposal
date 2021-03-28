<template>
  <div id="savedTemplates" class="container-fluid">
    <h1 class="text-center">Variable Proposal text</h1>
    <div class="row">
      <div class="col-md-3 new-proposal-box">
        <form>
          <div class="form-group">
            <small id="heading_help" class="form-text text-muted">
              Start by adding a cool Heading
            </small>
            <input
              type="text"
              class="form-control"
              id="proposal_heading"
              aria-describedby="heading_help"
              required
            />
          </div>

          <div class="form-group">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
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
          <div class="module-tooltip" v-show="showtooltip">
            <div class="tooltip-arrow"></div>
            <div class="tooltip-header">
              <div class="btn-group btn-block" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-dark">Elements</button>
                <button type="button" class="btn btn-dark">Saved</button>
              </div>
            </div>
            <div class="tooltip-content">
              <button class="btn btn-primary btn-block">Add Simple Text</button>
              <button class="btn btn-primary btn-block">Add Variable Text</button>
            </div>
          </div>
        </div>
        <button class="btn btn-block btn-dark mt-4" type="submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SavedTemplate",
  data: () => ({
    showtooltip: false,
    newProposal :[
      {heading: null }, {simpleTextBox: '' }
    ]
  }),
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

.tooltip-content{
  padding: 20px;
}
</style>
