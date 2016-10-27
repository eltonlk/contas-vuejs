<template>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper container">
                <a href="#" data-activates="nav-mobile" class="button-collapse">
                    <i class="material-icons">menu</i>
                </a>

                <a href="#" class="brand-logo">Contas</a>

                <ul class="right hide-on-med-and-down">
                    <li v-for="menu in menus">
                        <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>
                    </li>
                </ul>

                <ul id="nav-mobile" class="side-nav">
                    <li v-for="menu in menus">
                        <a v-link="{ name: menu.routeName }">{{ menu.text }}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <router-view></router-view>
</template>

<script>
    export default {
        created () {
            $(document).ready(() => {
                $(".button-collapse").sideNav({ closeOnClick: true });
            });
        },
        data () {
            return {
                menus: [
                    { text: "Dashboard"       , routeName: "dashboard"    },
                    { text: "Contas a pagar"  , routeName: "bill-pay"     },
                    { text: "Contas a receber", routeName: "bill-receive" }
                ]
            };
        }
    };
</script>
