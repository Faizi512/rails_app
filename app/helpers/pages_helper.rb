module PagesHelper
    def handsets
        @details = {
          camp_id: 'MEGA-MOBILE-DEALS',
          success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
          bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
          form_name: 'handset',
          optin_url: '/handset',
          sid: 1,
          ssid: nil,
          source:'',
          quick_submit: false,
          submit_on_load: false,
          uu_id: @cookie_uuid,
          ipaddress: request.remote_ip,
        }.to_json
      end
end
