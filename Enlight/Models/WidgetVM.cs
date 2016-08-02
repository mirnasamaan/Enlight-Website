using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Data.Context;

namespace Enlight.Models
{
    public class WidgetVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<int> WidgetOrder { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string WidgetContent { get; set; }


        public WidgetVM()
        {

        }


        public WidgetVM(Widget widget)
        {
            this.Id = widget.Id;
            this.Name = widget.Name;
            this.WidgetOrder = widget.WidgetOrder;
            this.Title = widget.Title;
            this.SubTitle = widget.SubTitle;
            this.WidgetContent = widget.WidgetContent;
        }


        public Widget toModel()
        {
            Widget widget = new Widget();
            widget.Id = this.Id;
            widget.Name = this.Name;
            widget.WidgetOrder = this.WidgetOrder;
            widget.Title = this.Title;
            widget.SubTitle = this.Title;
            widget.WidgetContent = this.WidgetContent;
            return widget;
        }
    }
}