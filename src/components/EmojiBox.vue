<template>
    <div class="emoji-box">
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
export default {
    data(){
        return {
        }
    },
    methods:{
        addEmojiToCtx(e){
            let emoji = e.target.getAttribute('data-emoji-text');
            this.$emit("selectedEmoji",emoji);
        }
    }
}
</script>

<style scoped>
.emoji-box {
    font-size: 12px;
    font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
    color: #222;
    overflow: visible;
    background: #fff;
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

