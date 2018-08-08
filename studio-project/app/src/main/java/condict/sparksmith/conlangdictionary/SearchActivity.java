package condict.sparksmith.conlangdictionary;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class SearchActivity extends AppCompatActivity {
    private Button searchButton;
    private String langFolder = "conlangs/", currentLang = "languages.txt";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        // Read in all the languages
        try {
            // Read in the list of languages saved to device
            InputStream inputStream = this.openFileInput(langFolder + currentLang);

            // Go through and get each language
            if ( inputStream != null ) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ( (receiveString = bufferedReader.readLine()) != null ) {
                    stringBuilder.append(receiveString);
                }

                inputStream.close();
            }
        } catch (FileNotFoundException e) {
            /*// The languages file doesn't exist, so create it with default languages
            try {
                OutputStreamWriter outputStreamWriter = new OutputStreamWriter(this.openFileOutput(langFolder + currentLang, Context.MODE_PRIVATE));
                outputStreamWriter.write("English\nAnglish\nTilan\n");
                outputStreamWriter.close();
            } catch (IOException e2) {
                Log.e("Exception", "File write failed: " + e2.toString());
            }*/
        } catch (IOException e) {
            Log.e("Exception", "Can not read file: " + e.toString());
        }

        // Attach search function to search button
        searchButton = (Button) findViewById(R.id.btnSearch);
        searchButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                search();
            }
        });
    }

    private void search() {

    }
}