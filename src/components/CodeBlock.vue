<template>
    <div class="code-block">
        <!-- 新增：行号栏 -->
        <div class="line-numbers" v-if="showLineNumbers">
            <span v-for="i in lineCount" :key="i">{{ i }}</span>
        </div>
        <pre class="code-pre">
      <code :class="`language-${lang}`" v-html="highlightedCodeWithCursor"></code>
    </pre>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import Prism from 'prismjs'
import prettier from 'prettier'

// 引入需要的语言高亮（按需引入，减小体积）
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-java'

// 引入样式
import 'prismjs/themes/prism-tomorrow.css'


const props = defineProps({
    // 代码内容
    code: {
        type: String,
        required: true
    },
    // 代码语言（如 js、vue、html）
    lang: {
        type: String,
        default: 'javascript'
    },
    // 新增：是否显示行号（默认开启）
    showLineNumbers: {
        type: Boolean,
        default: true
    },
    // 新增：打字机配置
    typingSpeed: { // 每个字符的打字速度（毫秒）
        type: Number,
        default: 100
    },
    loopTyping: { // 是否循环打字
        type: Boolean,
        default: false
    }
})

// 1. 自动格式化代码（核心优化）
const formatCode = (code: string, lang: string) => {
    try {
         // 第一步：新增！去掉代码最开头的所有空格/换行/Tab（核心修改）
        const cleanedCode = code.replace(/^\s+/, ''); // ^\s+ 匹配开头所有空白字符
        let javaPlugin = null
        if (lang === 'java') javaPlugin = require('prettier-plugin-java')
        const parsers: Record<string, any> = {
            java: [javaPlugin],
        }

        const formatOptions = {
            parser: lang === 'vue' ? 'vue' : lang === 'java' ? 'java' : lang === 'php' ? 'php' : lang,
            plugins: parsers[lang] || [parserBabel],
            tabWidth: 2,
            printWidth: 80,
            singleQuote: lang === 'java' || lang === 'php' ? false : true,
            trailingComma: lang === 'java' || lang === 'php' ? 'none' : 'es5',
            bracketSpacing: true
        }
        return prettier.format(cleanedCode, formatOptions)
    } catch (e) {
        console.warn(`[${lang}] 格式化失败：`, e)
        return code
    }
}

// 2. 先格式化再高亮
const formattedCode = computed(() => {
    const result = formatCode(props.code, props.lang);
    return result;
});

// 2. 打字机核心状态
const formattedFullCode = ref('') // 格式化后的完整代码
const currentCode = ref('') // 当前已打出的代码
const typingIndex = ref(0) // 当前打字的字符索引
const cursorVisible = ref(true) // 光标是否可见
let typingTimer: NodeJS.Timeout | null = null // 打字定时器
let cursorTimer: NodeJS.Timeout | null = null // 光标闪烁定时器

// 计算行数（适配行号）
const lineCount = computed(() => currentCode.value.split('\n').length)

// 高亮当前已打出的代码 + 光标
const highlightedCodeWithCursor = computed(() => {
    // 先高亮已打出的代码
    const highlighted = Prism.highlight(
        currentCode.value,
        Prism.languages[props.lang] || Prism.languages.markup,
        props.lang
    )
    // 添加光标（用<span>模拟，加闪烁动画）
    return highlighted + '<span class="typing-cursor" v-if="cursorVisible">|</span>'
})

// 3. 打字机逻辑
const startTyping = () => {
    // 重置状态
    typingIndex.value = 0
    currentCode.value = ''
    // 逐字符打字
    typingTimer = setInterval(() => {
        if (typingIndex.value >= formattedFullCode.value.length) {
            clearInterval(typingTimer!)
            // 若开启循环，延迟1秒后重新开始
            if (props.loopTyping) {
                setTimeout(startTyping, 1000)
            }
            return
        }
        // 拼接当前字符（保留换行/空格，保证格式）
        currentCode.value += formattedFullCode.value[typingIndex.value]
        typingIndex.value++
    }, props.typingSpeed)
}

// 4. 光标闪烁逻辑
const startCursorBlink = () => {
    cursorTimer = setInterval(() => {
        cursorVisible.value = !cursorVisible.value
    }, 500)
}

// 5. 监听props变化，重新格式化+启动打字
watch(
    () => [props.code, props.lang],
    () => {
        // 清除旧定时器
        if (typingTimer) clearInterval(typingTimer)
        // 重新格式化代码
        formattedFullCode.value = formatCode(props.code, props.lang)
        // 启动打字
        startTyping()
    },
    { immediate: true }
);

// 6. 生命周期：启动/销毁定时器
onMounted(() => {
    startCursorBlink() // 启动光标闪烁
})

onUnmounted(() => {
    if (typingTimer) clearInterval(typingTimer)
    if (cursorTimer) clearInterval(cursorTimer)
})

</script>

<style scoped>
/* 新增：行号栏样式 */
.line-numbers {
    padding: 8px 0;
    background: #181818;
    /* 行号栏背景稍暗，区分代码区 */
    text-align: right;
}

.line-numbers span {
    display: block;
    padding: 0 8px;
    color: #888;
    /* 行号颜色弱化 */
    font-size: 12px;
    line-height: 1.4;
}

.code-block {
    margin: 16px 0;
    border-radius: 8px;
    overflow: hidden;
    background: #1e1e1e;
    /* 新增：flex 布局适配行号 */
    display: flex;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    /* 新增：轻微阴影提升层次感 */
}

.code-pre {
    margin: 0;
    padding: 16px;
    color: #fff;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: auto;
    flex: 1;
    /* 自适应剩余宽度 */
}
</style>