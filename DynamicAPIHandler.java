package udm.test;

import javax.ws.rs.*;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import udm.tools.EmailSource;
import udm.tools.DatabaseSource;
import udm.tools.ThirdPartySource;
import udm.utilities.Log;
import udm.utilities.Settings;

import org.json.JSONArray;
import org.json.JSONObject;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;


/**
 * API Handler: Jersey handler which pulls a configuration file to determine which targets
 *              need to be looped through using reflection, this will allow for secure remote API editing
 * Created: 21/03/16
 * Package: udm.test
 */
@Path("/")
public class APIHandlerUsingReflection {


    // Public API functions
    // ========================================

    @OPTIONS
    public Response preflight() {
        return Response.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With")
                .build();
    }

    /**
     * Uses reflection to loop through targets in the
     * properties file and then inserts the data
     * @param data JSON object from web application
     * @return result of each target method
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public static Response insertData(String data) {

        JSONObject JSONData = new JSONObject(data);
        
        // Retrieve a contact email to notify
        String email = DatabaseSource.retrieveNextEmail(JSONData);
        
        String result = "true";

        // Get the list of targets we're sending the data to
        String[] methods = Settings.Retrieve("TARGETS").split(",");
        
        // Loop through the targets and execute
        for (String method1 : methods) {
            Method method = null;

            // Check the method exists
            try {
                method = APIHandlerUsingReflection.class.getDeclaredMethod(method1, JSONObject.class, String.class);
            } catch (NoSuchMethodException e) {
            
                // Print the error
                StringWriter errors = new StringWriter();
                e.printStackTrace(new PrintWriter(errors));
                
                // Log the error
                Log.Insert("warning", errors.toString(), method1);
                result = "Method does not exist error (Please check logs for more details)";
                
            }

            // Attempt to execute the method
            try {
                assert method != null;
                method.invoke(new APIHandlerUsingReflection(), new JSONObject(data), email);
            } catch (IllegalAccessException | InvocationTargetException e) {
            
                // Print the error
                StringWriter errors = new StringWriter();
                e.printStackTrace(new PrintWriter(errors));
                
                // Log the error
                Log.Insert("warning", errors.toString(), method1);
                result = "Target execution error (Please check logs for more details)";
                
            }

        }

        return Response.ok(result)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With")
                .build();

    }
    
    
    // Private tool functions
    // ========================================

    /**
     * Trigger an email
     * @return boolean based on email send success
     */
    private Boolean TargetOne(JSONObject JSONData, String email) {
        return EmailSource.email(JSONData, email);
    }

    /**
     * Insert into a DB instance
     * @return boolean based on Database insertion success
     */
    private String TargetTwo(JSONObject JSONData, String email) {
        return DatabaseSource.insert(JSONData, email);
    }

    /**
     * Push data to a third party API
     * @return boolean based on API call success
     */
    private String TargetThree(JSONObject JSONData, String email) {
        return ThirdPartySource.push(JSONData, email);
    }
    
}
