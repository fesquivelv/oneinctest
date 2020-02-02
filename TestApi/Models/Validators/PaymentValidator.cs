using FluentValidation;

namespace TestApi.Models.Validators
{
    public class PaymentValidator:  AbstractValidator<Payment>
    {
        public PaymentValidator(){
            RuleFor(p => p.Amount).NotEmpty().WithMessage("Amount is required");
            RuleFor(p => p.Description).NotEmpty().WithMessage("Description is required");
            RuleFor(p => p.User).NotEmpty().WithMessage("User is required");

        }
    }
}