class PagesController < ApplicationController
    include PagesHelper
    def index
        handsets
    end
    def aus
        handsets
    end
    def terms_condition
    end
    def cookie_policy
    end
    def risk_and_warnings
    end
    def privacy_policy
    end

    def thank_you
        form_data = {
            "investment-goal" => params["what-bring"],
            "interest-payment" => params["interest-paid-type"],
            "investment-amount" => params["invest-amount"],
            "email" => params["email"],
            "First_Name" =>params["first_name"],
            "Last_Name" => params["last_name"],
            "Phone_1" => params["phone"],
            "Postcode" => params["postcode"]
        }

        url = "https://dukeleads.leadbyte.co.uk/api/submit.php?returnjson=yes&campid=INVESTMENT"
        uri = URI(url)
        res = Net::HTTP.post_form(uri,form_data)
        response_data = JSON.parse(res.body)
        # if response_data["code"] != 1
        #     flash[:notice] = "Lead cannot be created due to some reason."
        #     redirect_to "/"
        # end
    end
end
