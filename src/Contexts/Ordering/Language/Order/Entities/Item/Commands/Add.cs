﻿using System;
using System.Collections.Generic;
using System.Text;
using Infrastructure.Commands;

namespace eShop.Ordering.Order.Entities.Item.Commands
{
    public class Add : StampedCommand
    {
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        
        public long Quantity { get; set; }
    }
}
