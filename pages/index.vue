<template>
  <main>
    <section class="profile">
      <div class="profile__container">
        <h1 class="profile__name">fe_feng</h1>
        <blockquote class="profile__description">
          maybe, I need to do something, maybe not
        </blockquote>
        <ul class="links">
            <li class="links__item"><a href="http://weibo.com/fefefeng">Weibo</a></li>
            <li class="links__item"><a href="https://twitter.com/fe_feng">Twitter</a></li>
            <li class="links__item"><a href="https://github.com/fengye9729">GitHub</a></li>
        </ul>
      </div>
    </section>
  </main>
</template>
<style>
.profile {
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
}
.profile__container {
  flex: 1;
  margin-top: -100px;
}
.profile__name {
  margin: 1rem 0;
}
.profile__description {
  color: #7f8c8d;
  margin: 1rem 4rem;
}
.links {
  text-align: center;
}
.links__item {
  display: inline-block;
  padding: 0 0.4rem;
}
a {
  color: #000;
}
</style>