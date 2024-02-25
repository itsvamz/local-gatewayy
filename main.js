"use strict";
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
const MenuOption = (props) => {
    const { toggled } = React.useContext(AppContext);
    const className = `menu-${props.type}-option`, delay = toggled ? 200 : 0;
    const styles = {
        transitionDelay: `${delay + (50 * props.index)}ms`
    };
    return (React.createElement("a", { href: props.url, target: "_blank", className: className, disabled: !toggled, style: styles },
        React.createElement("i", { className: props.icon }),
        React.createElement("h3", { className: props.type === "quick" ? "tooltip" : "label" }, props.label)));
};
const Menu = () => {
    const { toggled } = React.useContext(AppContext);
    const profileImage = "/locals/images/prof.png";
    const getOptions = (options, type) => {
        return options.map((option, index) => (React.createElement(MenuOption, { key: option.label, icon: option.icon, index: index, label: option.label, url: option.url, type: type })));
    };
    const getQuickOptions = () => {
        return getOptions([{
                icon: "fa-solid fa-bell", label: "Notifications", url: "#"
            }, {
                icon: "fa-solid fa-gear", label: "Settings", url: "profile.html"
            }, {
                icon: "fa-solid fa-moon", label: "Theme", onclick:"myFunction()"
            }], "quick");
    };
    const getFullOptions = () => {
        return getOptions([{
                icon: "fa-solid fa-house", label: "Home", url: "index.html"
            }, {
                icon: "fa-solid fa-user", label: "About", url: "#"
            }, {
                icon: "fa-solid fa-chart-line", label: "Register", url: "form.html"
            }, {
                icon: "fa-solid fa-heart", label: "Team", url: "team.html"
            }, {
                icon: "fa-solid fa-wallet", label: "Contact", url: "contact.html"
            }], "full");
    };
    return (React.createElement("div", { id: "menu", className: classNames({ toggled }) },
        React.createElement("div", { id: "menu-background-wrapper" },
            React.createElement("div", { id: "menu-background" })),
        React.createElement("img", { id: "menu-profile-image", src: profileImage }),
        React.createElement("div", { id: "menu-quick-options" }, getQuickOptions()),
        React.createElement("div", { id: "menu-full-options" }, getFullOptions())));
};
const AppContext = React.createContext(null);
const App = () => {
    const [toggled, setToggledTo] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => setToggledTo(true), 1000);
    }, []);
    const handleOnClick = () => setToggledTo(!toggled);
    return (React.createElement(AppContext.Provider, { value: { toggled } },
        React.createElement("div", { id: "app" },
            React.createElement(Menu, null),
            React.createElement("button", { id: "menu-toggle", type: "button", onClick: handleOnClick },
                React.createElement("i", { className: toggled ? "fa-solid fa-xmark-large" : "fa-solid fa-bars-staggered" })))));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));