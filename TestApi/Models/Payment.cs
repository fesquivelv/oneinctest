using System;

namespace TestApi.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public String User { get; set; }
        public String Description { get; set; }
    }
}