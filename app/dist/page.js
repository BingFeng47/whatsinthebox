"use strict";
exports.__esModule = true;
// import { ThemeToggle } from "@/components/theme-toggle"
var theme_toggle_1 = require("@/components/theme-toggle");
var lucide_react_1 = require("lucide-react");
function Home() {
    return (React.createElement("div", { className: "min-h-screen bg-background " },
        React.createElement("header", { className: "container mx-auto py-8 px-4" },
            React.createElement("div", { className: "flex flex-col items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6 text-center sm:flex-row sm:text-left" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: "relative animate-bounce" },
                        React.createElement(lucide_react_1.Package, { className: "h-10 w-10 text-blue-500" }),
                        React.createElement(lucide_react_1.Sparkles, { className: "absolute -right-3 -top-3 h-5 w-5 text-yellow-600" })),
                    React.createElement("h1", { className: "text-3xl font-bold tracking-tight sm:text-4xl pl-2" },
                        React.createElement("span", { className: "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent" }, "What's in This Box?"))),
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement("div", { className: "relative group" },
                        React.createElement(theme_toggle_1.ThemeToggle, null))))),
        React.createElement("main", { className: "container mx-auto px-4 py-8" })));
}
exports["default"] = Home;
