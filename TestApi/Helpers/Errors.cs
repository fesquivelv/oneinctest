

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace TestApi.Helpers
    { 
        public static class Errors
        {
            public static ModelStateDictionary AddErrorsToModelState(IdentityResult identityResult, ModelStateDictionary modelState)
            {
                foreach (var e in identityResult.Errors)
                {
                    modelState.TryAddModelError(e.Code, e.Description);
                }

                return modelState;
            }

            public static ModelStateDictionary AddErrorToModelState(string code, string description, ModelStateDictionary modelState)
            {
                modelState.TryAddModelError(code, description);
                return modelState;
            }

            public static ErrorResponse GetModelStateErrors(ModelStateDictionary modelState, string error){
                var errors = modelState.Values.SelectMany(e=> e.Errors.Select(er=>er.ErrorMessage)).ToList();
                var message = string.Join(", ", errors.ToArray());
                var err = new ErrorResponse{
                    Message = message,
                    Error = error
                };
                return err;
            }

                public static ErrorResponse CreateError(string error, string message){
                var err = new ErrorResponse{
                    Message = message,
                    Error = error
                };
                return err;
            }


            public class ErrorResponse {
                public string Error { get; set; }
                public string Message { get; set; }
            }



            }
        }
    

