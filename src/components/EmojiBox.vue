<template>
    <div tabindex="2" @blur="hideEmoojiBoxtest" @focus="showEmojiBox" class="emoji-box" v-bind:style="styleObj">
        <div class="emoji-title"><span>颜文字</span>
        </div>
        <div class="emoji-wrap">
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(⌒▽⌒)">(⌒▽⌒)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="（￣▽￣）">（￣▽￣）</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(=・ω・=)">(=・ω・=)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(｀・ω・´)">(｀・ω・´)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(〜￣△￣)〜">(〜￣△￣)〜</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(･∀･)">(･∀･)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(°∀°)ﾉ">(°∀°)ﾉ</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(￣3￣)">(￣3￣)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="╮(￣▽￣)╭">╮(￣▽￣)╭</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="( ´_ゝ｀)">( ´_ゝ｀)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="←_←">←_←</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="→_→">→_→</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(<_<)">(&lt;_&lt;)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(>_>)">(&gt;_&gt;)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(;¬_¬)">(;¬_¬)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(&quot;▔□▔)/">("▔□▔)/</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(ﾟДﾟ≡ﾟдﾟ)!?">(ﾟДﾟ≡ﾟдﾟ)!?</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="Σ(ﾟдﾟ;)">Σ(ﾟдﾟ;)</a> 
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="Σ( ￣□￣||)">Σ( ￣□￣||)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(´；ω；`)">(´；ω；`)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="（/TДT)/">（/TДT)/</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(^・ω・^ )">(^・ω・^ )</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(｡･ω･｡)">(｡･ω･｡)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(●￣(ｴ)￣●)">(●￣(ｴ)￣●)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="ε=ε=(ノ≧∇≦)ノ">ε=ε=(ノ≧∇≦)ノ</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(´･_･`)">(´･_･`)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(-_-#)">(-_-#)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="（￣へ￣）">（￣へ￣）</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(￣ε(#￣) Σ">(￣ε(#￣) Σ</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="ヽ(`Д´)ﾉ">ヽ(`Д´)ﾉ</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(╯°口°)╯(┴—┴">(╯°口°)╯(┴—┴</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="（#-_-)┯━┯">（#-_-)┯━┯</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="_(:3」∠)_">_(:3」∠)_</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(笑)">(笑)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(汗)">(汗)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(泣)">(泣)</a>
            <a class="emoji-list emoji-text" @click="addEmojiToCtx($event)" data-emoji-text="(苦笑)">(苦笑)</a>
        </div>
    </div>
</template>

<script>
import bus from "../assets/eventBus"
export default {
    data(){
        return {
            styleObj:{
                display: "none",
                left: "100px",
                top: "100px"
            },
            is_top: true
        }
    },
    methods:{
        hideEmoojiBoxtest(){
            this.tap("hide box test!");
            this.styleObj.display = "none"
        },
        showEmojiBox(){
            this.tap("show box!");
            this.styleObj.display = "block";
        },
        addEmojiToCtx(e){
            let emoji = e.target.getAttribute('data-emoji-text');
            this.tap("emoji:"+emoji);
            this.styleObj.display = "none";
            this.tap("is_top:" + this.is_top);
            bus.$emit("selectedEmoji",emoji,this.is_top);
        }
    },
    mounted(){
        bus.$on("changeEmojiPos",(display,x,y,is_top)=>{
                this.styleObj.display = display;
                this.styleObj.left = x;
                this.styleObj.top = y;
                this.is_top = is_top;
            this.tap("display:"+this.styleObj.display+" posx:"+this.styleObj.left+" posy:"+this.styleObj.top);
            this.tap("changed pos!");
        });
        bus.$on("hideEmojiBox",()=>{
            this.styleObj.display = "none"
            this.tap("post hideBox");
        });
    }
}
</script>

<style>
.emoji-box {
    font-size: 12px;
    font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
    color: #222;
    overflow: visible;
    background: #fff;
    border: 1px solid #ccd0d7;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,.14);
    margin-top: 7px;
    margin-bottom: 10px;
    border-radius: 4px;
    width: 386px;
    position: absolute;
    top: 25px;
    z-index: 103;
}
.emoji-box:before {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 30px;
    width: 8px;
    height: 5px;
    background: url(/static/arrow.png) 0 -49px no-repeat;
}
.emoji-box .emoji-title {
    margin: 8px 18px 0;
    color: #99a2aa;
}
.emoji-box .emoji-wrap {
    margin: 4px 8px 8px;
    height: 152px;
    overflow: auto;
}
.emoji-box .emoji-text {
    color: #111;
    border-radius: 4px;
    transition: background .2s;
    display: inline-block;
    padding: 3px 5px;
    margin: 2px 3px;
    outline: 0;
    text-decoration: none;
    cursor: pointer;
}
</style>

