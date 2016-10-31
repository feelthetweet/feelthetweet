import oauth.signpost.OAuthConsumer;
import oauth.signpost.commonshttp.CommonsHttpOAuthConsumer;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;

public class Main {

    static String AccessToken = "540137513-MMaUuCp89adYyjvA3oRa8Zcikec4bPO7en6aqMPJ";
    static String AccessSecret = "piZzq9SPVN93SJkbC6R5hj6uc6IyrVJ3aBBM1c9EsnJNA";
    static String ConsumerKey = "NjHpcD7A2Lmo1V9g944uvwUmT";
    static String ConsumerSecret = "qgMr5xX9AL4b3VITagD5LfbWkuLE3aROEbz80MmHMwb09K2XZF";

    /**
     * @param args
     */
    public static void main(String[] args) throws Exception {
        OAuthConsumer consumer = new CommonsHttpOAuthConsumer(
                ConsumerKey,
                ConsumerSecret);

        consumer.setTokenWithSecret(AccessToken, AccessSecret);
        HttpGet request = new HttpGet("https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi");
        consumer.sign(request);

        HttpClient httpClient = HttpClientBuilder.create().build();

        HttpResponse response = httpClient.execute(request);

        int statusCode = response.getStatusLine().getStatusCode();
        System.out.println(statusCode + ":" + response.getStatusLine().getReasonPhrase());
        System.out.println(IOUtils.toString(response.getEntity().getContent(), "UTF-8"));
    }
}
