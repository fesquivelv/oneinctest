using System;
using Microsoft.AspNetCore.Mvc;
using TestApi.Helpers;
using TestApi.Models;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace TestApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController: Controller
    {
        private readonly TestContext _context;

        public PaymentController(TestContext context){
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var payments = _context.Payments;
            return Ok(payments);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Payment payment){
            if (!ModelState.IsValid)
            {
                var error = Errors.GetModelStateErrors(ModelState, "Invalid request");
                return new BadRequestObjectResult(error);
            }
            payment.Date = DateTime.Now;
            _context.Payments.Add(payment);
            _context.SaveChanges();
            var payments = _context.Payments.ToList();
            return Ok(payments);
        }

        [HttpPut]
        public IActionResult put([FromBody] Payment payment){
            try {
                if (!ModelState.IsValid)
                {
                    var error = Errors.GetModelStateErrors(ModelState, "Invalid request");
                    return new BadRequestObjectResult(error);
                }
                payment.Date = DateTime.Now;
                _context.Payments.Update(payment);
                _context.SaveChanges();
                return Ok();
            }catch(Exception ex){
                var result = StatusCode(StatusCodes.Status500InternalServerError, Errors.CreateError("Internal server error", ex.Message));
                return result;
            }

        }


        [HttpDelete("{id}")]
        public IActionResult delete(int id) {
            try {
                var payment = _context.Payments.Find(id);
                _context.Payments.Remove(payment);
                _context.SaveChanges();
                var payments = _context.Payments.ToList();
                return Ok(payments);
            }catch(Exception ex) {
                var result = StatusCode(StatusCodes.Status500InternalServerError, Errors.CreateError("Internal server error", ex.Message));
                return result;
            }
        }


    }
}