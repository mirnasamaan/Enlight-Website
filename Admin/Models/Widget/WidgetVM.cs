using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models.Widget
{
    public class WidgetVM
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }

        public WidgetVM() { }

        public WidgetVM(Data.Context.Widget model)
        {
            this.Id = model.Id;
            this.Name = model.Name;
            this.Title = model.Title;
            this.SubTitle = model.SubTitle;
            this.Content = model.WidgetContent;
            this.Order = model.WidgetOrder;
        }

        public Data.Context.Widget toModel()
        {
            Data.Context.Widget model = new Data.Context.Widget();
            if (this.Id != null)
            {
                model.Id = this.Id.Value;
            }
            model.Name = this.Name;
            model.Title = this.Title;
            model.SubTitle = this.SubTitle;
            model.WidgetContent = this.Content;
            model.WidgetOrder = this.Order;
            return model;
        }

    }
}