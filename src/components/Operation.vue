<template>
    <div class="operation">
        <div tabindex="4" @focus="showOper" @blur="closeOper" class="spot">
        </div>
        <div class="opera-list" :style="displayOper">
            <ul><li class="blacklist">加入黑名单</li>
                <li class="report">举报</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            displayOper:{
                display: "none"
            }
        }
    },
    methods:{
        showOper(){
            this.tap("displatOper!");
            this.displayOper.display = "block";
        },
        closeOper(){
            this.tap("closeOper!");
            this.displayOper.display = "none";
        }
    }
}
</script>

<style scoped>
.bb-comment .comment-list .list-item .info .operation {
    position: relative;
    width: 18px;
    float: right;
    margin-top: 5px;
    margin-right: 0;
}
.bb-comment .comment-list .list-item .info .operation .spot {
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: url(/static/icons-comment.png) no-repeat;
    background-position: -151px -280px;
}
.bb-comment .comment-list .list-item .info .operation .opera-list li:hover {
    background: #e5e9ef;
    color: #00a1d6;
}
.bb-comment .comment-list .list-item .info .operation .opera-list li {
    padding: 0 15px;
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    transition: all .3s;
}
.opera-list {
    display: none;
    position: absolute;
    width: 100px;
    right: 0;
    top: 20px;
    z-index: 10;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
    border-radius: 4px;
    color: #222;
    font-size: 14px;
    padding: 10px 0;
    z-index: 999;
}
.opera-list li {
    padding: 0 15px;
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    transition: all .3s;
}
</style>
