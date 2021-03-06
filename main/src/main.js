import Vue from 'vue'
import App from './App'
import { applicationEntry } from '@/config/base.js'

import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun'
const pdfPackage = require('../../vue-pdf-image/package.json')
const vue3Package = require('../../vue3-qiankun/package.json')
let app = null

function render ({ loading }) {
    if (!app) {
        app = new Vue({
            el: '#app',
            data () {
                return {
                    loading,
                }
            },
            render (h) {
                return h(App, {
                    props: {
                        loading: this.loading
                    }
                })
            }
        });
    } else {
        app.loading = loading
    }
}

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true })

const loader = (loading) => render({ loading })

/**
 * Step2 注册子应用
 */

registerMicroApps(
    [
        {
            name: pdfPackage.name, // 子应用名称
            entry: process.env.NODE_ENV === 'production' ? applicationEntry.entry : '//localhost:8000', // 子应用入口地址
            container: '#subapp-viewport',
            loader,
            activeRule: '/pdf', // 子应用触发路由
        },
        {
            name: vue3Package.name,
            entry: process.env.NODE_ENV === 'production' ? applicationEntry.childrenTwo : '//localhost:3000',
            container: '#subapp-viewport',
            loader,
            activeRule: '/vue3',
        },
    ],
    // 子应用生命周期事件
    {
        beforeLoad: [
            app => {
                console.log('[LifeCycle] before load %c%s', 'color: green', app.name)
            },
        ],
        beforeMount: [
            app => {
                console.log('[LifeCycle] before mount %c%s', 'color: green', app.name)
            },
        ],
        afterUnmount: [
            app => {
                console.log('[LifeCycle] after unmount %c%s', 'color: green', app.name)
            },
        ],
    },
)

// 定义全局状态，可以在主应用、子应用中使用
const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'qiankun',
})

// 监听全局状态变化
onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

// 设置全局状态
setGlobalState({
    ignore: 'master',
    user: {
        name: 'master',
    },
})

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/pdf')

/**
 * Step4 启动应用
 */
start()

runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted')
})
