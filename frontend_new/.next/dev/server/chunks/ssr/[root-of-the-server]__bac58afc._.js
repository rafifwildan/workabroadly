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
"[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ActivityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$AppSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/components/AppSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drama$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drama$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/drama.js [app-ssr] (ecmascript) <export default as Drama>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/Documents/workabroadly/frontend_new/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
"use client";
;
;
;
;
;
function ActivityPage() {
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const activities = [
        {
            id: 1,
            type: "chat",
            title: "Completed Expat AI Chat",
            description: "Discussed visa requirements for Japan",
            timestamp: "2 hours ago",
            date: "Nov 2, 2025"
        },
        {
            id: 2,
            type: "roleplay",
            title: "Completed Role-Play Practice",
            description: "Business Meeting Etiquette in Japan",
            timestamp: "1 day ago",
            date: "Nov 1, 2025"
        },
        {
            id: 3,
            type: "purchase",
            title: "Purchased Credits",
            description: "Added 250 credits to your account",
            timestamp: "3 days ago",
            date: "Oct 30, 2025"
        },
        {
            id: 4,
            type: "chat",
            title: "Completed Expat AI Chat",
            description: "Asked about workplace culture in Korea",
            timestamp: "5 days ago",
            date: "Oct 28, 2025"
        },
        {
            id: 5,
            type: "roleplay",
            title: "Completed Role-Play Practice",
            description: "Email Communication in Korean Business",
            timestamp: "1 week ago",
            date: "Oct 26, 2025"
        },
        {
            id: 6,
            type: "chat",
            title: "Completed Expat AI Chat",
            description: "Discussed job search strategies",
            timestamp: "1 week ago",
            date: "Oct 25, 2025"
        },
        {
            id: 7,
            type: "roleplay",
            title: "Completed Role-Play Practice",
            description: "Networking Event Conversation",
            timestamp: "2 weeks ago",
            date: "Oct 19, 2025"
        },
        {
            id: 8,
            type: "purchase",
            title: "Upgraded to Professional Plan",
            description: "Subscribed to Professional plan ($15/month)",
            timestamp: "2 weeks ago",
            date: "Oct 18, 2025"
        }
    ];
    const filteredActivities = activities.filter((activity)=>{
        if (filter === "all") return true;
        if (filter === "chats") return activity.type === "chat";
        if (filter === "roleplays") return activity.type === "roleplay";
        if (filter === "purchases") return activity.type === "purchase";
        return true;
    });
    const getActivityIcon = (type)=>{
        switch(type){
            case "chat":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                    className: "w-6 h-6 text-gray-600"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                    lineNumber: 93,
                    columnNumber: 16
                }, this);
            case "roleplay":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drama$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drama$3e$__["Drama"], {
                    className: "w-6 h-6 text-gray-600"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                    lineNumber: 95,
                    columnNumber: 16
                }, this);
            case "purchase":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                    className: "w-6 h-6 text-gray-600"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                    lineNumber: 97,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                    className: "w-6 h-6 text-gray-600"
                }, void 0, false, {
                    fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                    lineNumber: 99,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$components$2f$AppSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col md:ml-64",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border-b border-gray-200 py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 sm:px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        !sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSidebarOpen(true),
                                            className: "hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-900",
                                            "aria-label": "Open sidebar",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/profile",
                                            className: "flex items-center gap-2 text-black hover:text-gray-700 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium",
                                                    children: "Back to Profile"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl font-bold text-black mb-2",
                                            children: "Activity History"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base text-black/70",
                                            children: "View all your past activities and interactions"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 px-4 sm:px-6 lg:px-8 py-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilter("all"),
                                        className: `px-6 py-2 rounded-full font-medium transition-colors ${filter === "all" ? "bg-black text-white" : "bg-white text-black border-2 border-gray-200 hover:border-black"}`,
                                        children: "All Activity"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilter("chats"),
                                        className: `px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${filter === "chats" ? "bg-black text-white" : "bg-white text-black border-2 border-gray-200 hover:border-black"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                lineNumber: 157,
                                                columnNumber: 15
                                            }, this),
                                            "Chats"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilter("roleplays"),
                                        className: `px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${filter === "roleplays" ? "bg-black text-white" : "bg-white text-black border-2 border-gray-200 hover:border-black"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drama$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drama$3e$__["Drama"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, this),
                                            "Role-Plays"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilter("purchases"),
                                        className: `px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${filter === "purchases" ? "bg-black text-white" : "bg-white text-black border-2 border-gray-200 hover:border-black"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 15
                                            }, this),
                                            "Purchases"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "soft-card rounded-2xl bg-white shadow-lg p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: filteredActivities.map((activity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-4 p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0",
                                                        children: getActivityIcon(activity.type)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-base font-medium text-black",
                                                                children: activity.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                                lineNumber: 196,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600 mt-1",
                                                                children: activity.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                                lineNumber: 197,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-4 mt-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: activity.timestamp
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                                        lineNumber: 199,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-400",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                                        lineNumber: 200,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: activity.date
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                                        lineNumber: 201,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                                lineNumber: 198,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, activity.id, true, {
                                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                                lineNumber: 188,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this),
                                    filteredActivities.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-12",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$workabroadly$2f$frontend_new$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500",
                                            children: "No activities found for this filter."
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/workabroadly/frontend_new/app/activity/page.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bac58afc._.js.map