module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/workabroadly/frontend_new/lib/usage-calculator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// User Plan Types
__turbopack_context__.s([
    "CREDIT_COSTS",
    ()=>CREDIT_COSTS,
    "PLAN_CREDITS",
    ()=>PLAN_CREDITS,
    "PLAN_LIMITS",
    ()=>PLAN_LIMITS,
    "canUseService",
    ()=>canUseService,
    "getCreditUsage",
    ()=>getCreditUsage,
    "getMockUserUsage",
    ()=>getMockUserUsage,
    "getRemainingUsage",
    ()=>getRemainingUsage,
    "getUsagePercentage",
    ()=>getUsagePercentage,
    "incrementUsage",
    ()=>incrementUsage,
    "resetUsage",
    ()=>resetUsage,
    "shouldResetUsage",
    ()=>shouldResetUsage
]);
const PLAN_LIMITS = {
    starter: {
        chatSessions: 3,
        rolePlays: 3,
        price: 0,
        name: "Starter"
    },
    professional: {
        chatSessions: 20,
        rolePlays: 10,
        price: 15,
        name: "Professional"
    },
    premium: {
        chatSessions: 50,
        rolePlays: 20,
        price: 20,
        name: "Premium"
    },
    enterprise: {
        chatSessions: -1,
        rolePlays: -1,
        price: null,
        name: "Enterprise"
    }
};
const CREDIT_COSTS = {
    chatSession: 10,
    rolePlay: 20
};
const PLAN_CREDITS = {
    starter: 0,
    professional: 400,
    premium: 900,
    enterprise: -1
};
function getRemainingUsage(usage) {
    const limits = PLAN_LIMITS[usage.plan];
    return {
        chatSessionsRemaining: limits.chatSessions === -1 ? "Unlimited" : Math.max(0, limits.chatSessions - usage.chatSessionsUsed),
        rolePlaysRemaining: limits.rolePlays === -1 ? "Unlimited" : Math.max(0, limits.rolePlays - usage.rolePlaysUsed),
        chatSessionsTotal: limits.chatSessions,
        rolePlaysTotal: limits.rolePlays
    };
}
function canUseService(usage, serviceType) {
    const limits = PLAN_LIMITS[usage.plan];
    if (serviceType === "chat") {
        return limits.chatSessions === -1 || usage.chatSessionsUsed < limits.chatSessions;
    } else {
        return limits.rolePlays === -1 || usage.rolePlaysUsed < limits.rolePlays;
    }
}
function incrementUsage(usage, serviceType) {
    if (serviceType === "chat") {
        return {
            ...usage,
            chatSessionsUsed: usage.chatSessionsUsed + 1
        };
    } else {
        return {
            ...usage,
            rolePlaysUsed: usage.rolePlaysUsed + 1
        };
    }
}
function shouldResetUsage(usage) {
    const now = new Date();
    const resetDate = new Date(usage.resetDate);
    // Reset if we've passed the reset date
    return now >= resetDate;
}
function resetUsage(usage, isTopUp = false) {
    const now = new Date();
    const nextResetDate = new Date(now);
    nextResetDate.setMonth(nextResetDate.getMonth() + 1);
    nextResetDate.setDate(1); // First day of next month
    nextResetDate.setHours(0, 0, 0, 0);
    return {
        ...usage,
        chatSessionsUsed: 0,
        rolePlaysUsed: 0,
        resetDate: nextResetDate,
        lastTopUpDate: isTopUp ? now : usage.lastTopUpDate
    };
}
function getUsagePercentage(usage, serviceType) {
    const limits = PLAN_LIMITS[usage.plan];
    if (serviceType === "chat") {
        if (limits.chatSessions === -1) return 0 // Unlimited
        ;
        return usage.chatSessionsUsed / limits.chatSessions * 100;
    } else {
        if (limits.rolePlays === -1) return 0 // Unlimited
        ;
        return usage.rolePlaysUsed / limits.rolePlays * 100;
    }
}
function getCreditUsage(usage) {
    const creditsUsed = usage.chatSessionsUsed * CREDIT_COSTS.chatSession + usage.rolePlaysUsed * CREDIT_COSTS.rolePlay;
    const totalCredits = PLAN_CREDITS[usage.plan];
    const creditsRemaining = totalCredits === -1 ? "Unlimited" : Math.max(0, totalCredits - creditsUsed);
    const featuresUsed = usage.chatSessionsUsed + usage.rolePlaysUsed;
    return {
        creditsUsed,
        creditsRemaining,
        totalCredits,
        featuresUsed
    };
}
function getMockUserUsage() {
    const now = new Date();
    const resetDate = new Date(now);
    resetDate.setMonth(resetDate.getMonth() + 1);
    resetDate.setDate(1);
    resetDate.setHours(0, 0, 0, 0);
    return {
        userId: "mock-user-123",
        plan: "professional",
        chatSessionsUsed: 5,
        rolePlaysUsed: 3,
        resetDate: resetDate
    };
}
}),
"[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserPlanBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$lib$2f$usage$2d$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/lib/usage-calculator.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function UserPlanBadge({ usage, showDetails = true }) {
    const planInfo = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$lib$2f$usage$2d$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLAN_LIMITS"][usage.plan];
    const creditUsage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$lib$2f$usage$2d$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCreditUsage"])(usage);
    const getPlanIcon = ()=>{
        switch(usage.plan){
            case "starter":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                    lineNumber: 18,
                    columnNumber: 16
                }, this);
            case "professional":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                    lineNumber: 20,
                    columnNumber: 16
                }, this);
            case "premium":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                    lineNumber: 22,
                    columnNumber: 16
                }, this);
            case "enterprise":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                    lineNumber: 24,
                    columnNumber: 16
                }, this);
        }
    };
    const getPlanColor = ()=>{
        return "bg-black/5 text-black border-black/20";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-xl border-2 ${getPlanColor()} p-4`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-2",
                children: [
                    getPlanIcon(),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-lg",
                        children: planInfo.name
                    }, void 0, false, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            showDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Credits Used:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: creditUsage.creditsUsed
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Remaining Credits:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: creditUsage.creditsRemaining === "Unlimited" ? "Unlimited" : creditUsage.creditsRemaining
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Chat Sessions:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: usage.chatSessions
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Role-Plays:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: usage.rolePlays
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drama$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drama$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/drama.js [app-ssr] (ecmascript) <export default as Drama>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$UserPlanBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/components/UserPlanBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$lib$2f$usage$2d$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/lib/usage-calculator.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function AppSidebar() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const userUsage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$lib$2f$usage$2d$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockUserUsage"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true) // <--- Tambah state
    ;
    const navItems = [
        {
            href: "/home",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
            label: "Home"
        },
        {
            href: "/expat-ai",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
            label: "Expat AI Chat Bot"
        },
        {
            href: "/role-play",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drama$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drama$3e$__["Drama"],
            label: "Cultural Role-Play"
        },
        {
            href: "/profile",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
            label: "Profile"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md border border-gray-200",
                children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                    lineNumber: 29,
                    columnNumber: 19
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                    lineNumber: 29,
                    columnNumber: 47
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `
          fixed top-0 left-0 bottom-0 z-40
          bg-white border-r border-gray-200 flex flex-col justify-between
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}
          md:w-64 md:translate-x-0
        `,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} transition-opacity duration-300`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 border-b border-gray-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/home",
                                    className: "flex items-center gap-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/logo.jpeg",
                                        alt: "WorkAbroadly",
                                        className: "h-9 w-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "p-6 space-y-3",
                                children: navItems.map((item)=>{
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: `flex items-center gap-3 rounded-full p-3 font-medium transition-colors ${isActive ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                                lineNumber: 66,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                                lineNumber: 67,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.href, true, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-6 border-t border-gray-200 space-y-4 ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} transition-opacity`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$UserPlanBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        usage: userUsage,
                                        showDetails: true
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/my-plan",
                                        className: "block mt-2 text-center text-sm text-gray-900 hover:text-gray-700 hover:underline",
                                        children: "Manage Plan"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/logout",
                                className: "flex items-center gap-3 rounded-full p-3 font-medium transition-colors hover:bg-red-50 text-red-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Log Out"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setIsOpen(false),
                className: "fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
            }, void 0, false, {
                fileName: "[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/Documents/workabroadly/frontend_new/lib/products.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CREDIT_COSTS",
    ()=>CREDIT_COSTS,
    "CREDIT_PACKAGES",
    ()=>CREDIT_PACKAGES,
    "TOKEN_PACKAGES",
    ()=>TOKEN_PACKAGES
]);
const CREDIT_PACKAGES = [
    {
        id: "free-tier",
        name: "Starter",
        description: "Perfect for getting started",
        credits: 0,
        priceInCents: 0,
        chatSessions: 3,
        rolePlayPractices: 3,
        rolePlayType: "basic",
        reportType: "basic",
        features: [
            "3 Chat sessions",
            "3 Role-play practices",
            "Basic feedback"
        ]
    },
    {
        id: "professional-pack",
        name: "Professional",
        description: "Most popular choice for serious learners",
        credits: 400,
        priceInCents: 1500,
        popular: true,
        chatSessions: 20,
        rolePlayPractices: 10,
        rolePlayType: "premium",
        reportType: "comprehensive",
        features: [
            "20 Chat sessions (200 credits)",
            "10 Role-play practices (200 credits)",
            "Comprehensive feedback",
            "Practice reports"
        ]
    },
    {
        id: "premium-pack",
        name: "Premium",
        description: "Best value for dedicated learners",
        credits: 900,
        priceInCents: 2000,
        chatSessions: 50,
        rolePlayPractices: 20,
        rolePlayType: "premium",
        reportType: "comprehensive-plus",
        features: [
            "50 Chat sessions (500 credits)",
            "20+ Role-play practices (400 credits)",
            "Advanced feedback",
            "Personalized roadmap"
        ]
    },
    {
        id: "enterprise-pack",
        name: "Enterprise",
        description: "Custom solution for teams",
        credits: 0,
        priceInCents: 0,
        chatSessions: 999,
        rolePlayPractices: 999,
        rolePlayType: "premium",
        reportType: "comprehensive-plus",
        features: [
            "Unlimited sessions",
            "Custom scenarios",
            "Team management",
            "Priority support"
        ]
    }
];
const CREDIT_COSTS = {
    CHAT_SESSION: 10,
    ROLE_PLAY: 20
};
const TOKEN_PACKAGES = CREDIT_PACKAGES;
}),
"[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
"use client";
;
;
;
function PageHeader({ title, subtitle, breadcrumb, showProfile = false, sidebarOpen, onMenuClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border-b border-gray-200 p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        !sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onMenuClick,
                            className: "hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-900",
                            "aria-label": "Open sidebar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                lineNumber: 33,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                breadcrumb && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500 mb-2",
                                    children: breadcrumb
                                }, void 0, false, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                    lineNumber: 37,
                                    columnNumber: 28
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-gray-900 mb-1",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700",
                                    children: subtitle
                                }, void 0, false, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                showProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/profile",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    className: "w-6 h-6 text-gray-900"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                    lineNumber: 46,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold",
                                        children: "Sarah Johnson"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-600",
                                        children: "Professional Member"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                        lineNumber: 50,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                        lineNumber: 44,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PricingCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function PricingCard({ package: pkg, showPurchaseButton = false, ctaText = "Get Started", ctaLink }) {
    const priceDisplay = pkg.priceInCents === 0 ? "0" : (pkg.priceInCents / 100).toFixed(2);
    const perCredit = pkg.credits > 0 ? (pkg.priceInCents / 100 / pkg.credits).toFixed(3) : null;
    const isEnterprise = pkg.id === "enterprise-pack";
    const isFree = pkg.id === "free-tier";
    // Tentukan link tombol
    const buttonLink = ctaLink || (showPurchaseButton ? `/my-plan/buy?package=${pkg.id}` : "/signup");
    // --- Penyiapan Style Dinamis ---
    let cardStyle = {};
    let buttonClasses = "";
    const checkmarkClasses = "bg-gray-900 text-white";
    const popularLabelClasses = "bg-gray-900 text-white";
    if (isFree) {
        // Starter (Hijau)
        cardStyle = {
            backgroundImage: `url('/images/card1.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };
        buttonClasses = "bg-gray-900 text-white hover:bg-gray-800";
    } else if (pkg.popular) {
        // Professional (Kuning)
        cardStyle = {
            backgroundImage: `url('/images/card2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };
        buttonClasses = "bg-white text-gray-900 hover:bg-gray-100";
    } else if (isEnterprise) {
        // Enterprise (Pink)
        cardStyle = {
            backgroundImage: `url('/images/card4.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };
        buttonClasses = "bg-gray-900 text-white hover:bg-gray-800";
    } else {
        // Premium (Ungu)
        cardStyle = {
            backgroundImage: `url('/images/card3.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };
        buttonClasses = "bg-gray-900 text-white hover:bg-gray-800";
    }
    // --- Akhir Penyiapan Style ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl p-8 relative transition-all duration-300 overflow-hidden shadow-lg text-gray-900",
        style: cardStyle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 flex flex-col h-full",
            children: [
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative mb-1",
                    children: [
                        " ",
                        pkg.popular && // PERBAIKAN: Posisi label 'POPULAR'
                        // Dibuat absolute di tengah atas, dan ada margin-bottom
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute -top-4 left-1/2 -translate-x-1/2 ${popularLabelClasses} px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap`,
                            children: "POPULAR"
                        }, void 0, false, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-3xl font-bold mt-4",
                            children: [
                                " ",
                                pkg.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                isFree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg mb-6 text-gray-700",
                    children: "For personal"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `mb-8 flex ${isEnterprise ? 'justify-center' : 'items-baseline'} min-h-[80px]`,
                    children: isEnterprise ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-6xl font-bold",
                        children: "Custom"
                    }, void 0, false, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-6xl font-bold",
                                children: [
                                    "$",
                                    priceDisplay
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this),
                            !isFree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl ml-1 font-medium",
                                children: "/mo"
                            }, void 0, false, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                                lineNumber: 104,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                showPurchaseButton && !isFree && !isEnterprise && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm mb-2",
                            children: [
                                pkg.credits,
                                " credits"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this),
                        perCredit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs",
                            children: [
                                "$",
                                perCredit,
                                "/credit"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                    lineNumber: 110,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-4 mb-10 flex-grow",
                    children: pkg.features.map((feature, idx)=>{
                        const match = feature.match(/^(.*?)\s*(\(.*?\))?$/);
                        const mainText = match ? match[1] : feature;
                        const subText = match ? match[2] : null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${checkmarkClasses}`,
                                    children: "✓"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                                    lineNumber: 131,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base",
                                    children: [
                                        mainText,
                                        subText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-600 ml-1",
                                            children: subText
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                                            lineNumber: 138,
                                            columnNumber: 31
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                                    lineNumber: 136,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                            lineNumber: 130,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: buttonLink,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `w-full rounded-full font-semibold py-4 px-6 transition-all duration-300 text-lg ${buttonClasses}`,
                        children: showPurchaseButton && !isFree && !isEnterprise ? "Purchase" : "Subscribe now"
                    }, void 0, false, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
                    lineNumber: 146,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyPlanPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gem$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/gem.js [app-ssr] (ecmascript) <export default as Gem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$AppSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$lib$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/lib/products.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/components/PageHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$PricingCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/components/PricingCard.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const usageHistory = [
    {
        date: "Oct 27, 2025",
        activity: "Expat AI Chat Session",
        credits: -10
    },
    {
        date: "Oct 26, 2025",
        activity: "Role-Play: First Day",
        credits: -20
    },
    {
        date: "Oct 25, 2025",
        activity: "Expat AI Chat Session",
        credits: -10
    },
    {
        date: "Oct 24, 2025",
        activity: "Role-Play: Interview",
        credits: -20
    },
    {
        date: "Oct 23, 2025",
        activity: "Expat AI Chat Session",
        credits: -10
    }
];
function MyPlanPage() {
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const purchasablePackages = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$lib$2f$products$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CREDIT_PACKAGES"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$AppSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col md:ml-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "flex-1 overflow-auto pb-24 md:pb-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            title: "My Plan",
                            subtitle: "Manage your credits and purchase more",
                            sidebarOpen: sidebarOpen,
                            onMenuClick: ()=>setSidebarOpen(true)
                        }, void 0, false, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 space-y-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black text-white rounded-3xl p-10 shadow-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gem$3e$__["Gem"], {
                                                className: "w-16 h-16"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                lineNumber: 54,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-5xl font-bold mb-2",
                                                        children: "250 credits"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                        lineNumber: 56,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-lg opacity-90",
                                                        children: "Professional Plan"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                        lineNumber: 57,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm opacity-75 mt-2",
                                                        children: "1 Chat Session = 10 credits • 1 Role-Play = 20 credits"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                        lineNumber: 58,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                lineNumber: 55,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold text-gray-900 mb-8",
                                            children: "Purchase Credit Packages"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                                            children: purchasablePackages.map((pkg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$PricingCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    package: pkg,
                                                    showPurchaseButton: true
                                                }, pkg.id, false, {
                                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-gray-900 mb-6",
                                            children: "Recent Credit Usage"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "overflow-x-auto",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                    className: "w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                            className: "bg-gray-100 border-b border-gray-200",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left p-6 text-sm font-medium text-gray-900",
                                                                        children: "Date"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                                        lineNumber: 81,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-left p-6 text-sm font-medium text-gray-900",
                                                                        children: "Activity"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                                        lineNumber: 82,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                        className: "text-right p-6 text-sm font-medium text-gray-900",
                                                                        children: "Credits Used"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                                        lineNumber: 83,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                                lineNumber: 80,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                            lineNumber: 79,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                            children: usageHistory.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "border-b border-gray-200 hover:bg-gray-50 transition-colors",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-6 text-sm text-gray-600",
                                                                            children: item.date
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                                            lineNumber: 89,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-6 text-sm text-gray-900 font-medium",
                                                                            children: item.activity
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                                            lineNumber: 90,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "p-6 text-sm text-right text-red-600 font-medium",
                                                                            children: [
                                                                                item.credits,
                                                                                " credits"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                                            lineNumber: 91,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                                    lineNumber: 88,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                            lineNumber: 86,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/workabroadly/frontend_new/app/my-plan/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__16642e73._.js.map