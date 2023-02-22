odoo.define("fiscal_epos_print.SetLotteryCodeButton", function (require) {
    "use strict";

    const PosComponent = require("point_of_sale.PosComponent");
    const ProductScreen = require("point_of_sale.ProductScreen");
    const Registries = require("point_of_sale.Registries");
    const {Gui} = require("point_of_sale.Gui");
    const core = require("web.core");
    const _t = core._t;

    class SetLotteryCodeButton extends PosComponent {
        //        Constructor() {
        //            super(...arguments);
        //            useListener("click", this.onClick);
        // This is from older widget system 12.0
        // var self = this;
        // This.pos.bind('change:selectedOrder',function(){
        //     //self.renderElement();
        // },this);
        //        }
        //        mounted() {
        //            var color = this.lottery_get_button_color();
        //            this.$el.css("background", color);
        //        }

        render() {
            var color = this.lottery_get_button_color();
            this.$el.css("background", color);
        }

        async onClick() {
            var current_order = this.env.pos.get_order();
            Gui.showPopup("LotteryCodePopup", {
                title: _t("Lottery Code"),
                lottery_code: current_order.lottery_code,
                update_lottery_info_button: function () {
                    self.render();
                },
            });
        }

        lottery_get_button_color() {
            var order = this.env.pos.get_order();
            var color = "#e2e2e2";
            if (order.lottery_code) {
                color = "lightgreen";
            }
            return color;
        }
    }

    SetLotteryCodeButton.template = "SetLotteryCodeButton";

    ProductScreen.addControlButton({
        component: SetLotteryCodeButton,
        condition: function () {
            return this.env.pos;
        },
    });

    Registries.Component.add(SetLotteryCodeButton);

    return SetLotteryCodeButton;
});
