<template>
    <div class="f-container">
        <p class="site-footer__copyright">© {{new Date().getFullYear()}} Darker. &nbsp;Power By
            <img class="heart" src="/static/love.png"/>
            </p>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.f-container{
    background-color: #141422;
    position: relative;
    bottom: 0;
}
.site-footer__copyright {
    text-align: center;
    margin-top: 5px;
}
p {
    font-family: 'Open Sans',sans-serif;
}
.heart {
    width: 20px;
    height: 20px;
    margin-left: .2em;
    margin-right: .2em;
}
.heart:before {
    content: "\f004";
}
</style>


