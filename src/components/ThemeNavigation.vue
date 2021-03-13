<template>
    <div id="themenavigation" class="mb-5">
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="/">My Proposals</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/templates">Saved Templates</b-nav-item>
            <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/login">Login</b-nav-item>
            <b-nav-item href="/signup">Signup</b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                User
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>
<script>
export default {
  name: "ThemeNavigation",
};
</script>
<style scoped>
.md-tabs + .md-tabs {
  margin-top: 24px;
}
</style>
