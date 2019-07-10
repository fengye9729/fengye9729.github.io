<template>
  <main>
    <section class="profile">
      <div class="profile__container">
        <h1 class="profile__name">ShiRouMi</h1>
        <blockquote class="profile__description">
          我不会写代码
        </blockquote>
        <ul class="links">
            <li class="links__item"><a href="http://weibo.com/fefefeng">Weibo</a></li>
            <li class="links__item"><a href="https://twitter.com/fe_feng">Twitter</a></li>
            <li class="links__item"><a href="https://github.com/ShiRouMi">GitHub</a></li>
            <li class="links__item"><a href="https://segmentfault.com/u/fe_feng">Segmentfault</a></li>
            <li class="links__item"><a href="https://segmentfault.com/blog/fe_feng">Blog</a></li>
        </ul>
      </div>
    </section>
  </main>
</template>
<style>
@font-face {
  font-family: 'Permanent Marker';
  font-style: normal;
  font-weight: 400;
  src: local('Permanent Marker Regular'), local('PermanentMarker-Regular'), url(https://fonts.gstatic.com/s/permanentmarker/v7/Fh4uPib9Iyv2ucM6pGQMWimMp004La2Cf5b6jlg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
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
  font-family: 'Permanent Marker', sans-serif;
  font-size: 5em;
  width: 100%;
  text-align: center;
  margin: 1rem 0;
}
.profile__description {
  color: #7f8c8d;
  margin: 1rem 4rem;
}
.links {
  text-align: center;
}
ul {
  padding: 0;
}
.links__item {
  display: inline-block;
  padding: 0 0.4rem;
}
a {
  color: #000;
}
</style>