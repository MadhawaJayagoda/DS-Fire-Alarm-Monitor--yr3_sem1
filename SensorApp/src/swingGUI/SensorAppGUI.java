package swingGUI;

import java.awt.BorderLayout;   
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import com.sun.javafx.iio.common.SmoothMinifier;

import java.awt.FlowLayout;
import javax.swing.JLabel;
import java.awt.Font;
import javax.swing.SwingConstants;
import javax.swing.JTextArea;
import java.awt.GridLayout;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

import org.json.JSONException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.swing.JTextField;

public class SensorAppGUI extends JFrame {
	
	/**
	 * 
	 * @author  Jayagoda N.M.
	 * 			IT17184304
	 * 
	 */

	private JPanel contentPane;
	static int floorNum;
	static int roomNum;	
	static int smokeLevel;
	static int carbondioxideLevel;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		
		TimerTask task = new TimerTask() {
		      public void run() {
		        Random rand = new Random();
		        smokeLevel = rand.nextInt(9);
		        if (smokeLevel == 0 || smokeLevel == 1 ) {
					carbondioxideLevel = 0;
				} else {
					carbondioxideLevel = smokeLevel - rand.nextInt(3);
				}
		        
		        //jsonOutput();
		        
		        //send sensorData
		        try {
					JSONObject res = sendSensorData();
					System.out.println(res);
				} catch (IOException | JSONException | ParseException e) {
					e.printStackTrace();
				}
		        System.out.println("Floor Num : " + floorNum);
		        System.out.println("Room Num : " + roomNum);
		        System.out.println("Smoke Level : " + smokeLevel);
		        System.out.println("carbondioxide Level : " + carbondioxideLevel + "\n");
		      }
		    };
		    Timer timer = new Timer();
		    long delay = 0;
		    long intevalPeriod = 10 * 1000; 
		    // schedules the task to be run in an interval 
		    timer.scheduleAtFixedRate(task, delay, intevalPeriod);
	
		
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					SensorAppGUI frame = new SensorAppGUI();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
		
	}
	
	public static void jsonOutput() {
		String jsonString = "{"
        		+ "\"floor_no\" : "+ floorNum + ","
        		+ "\"room_no\" : " + roomNum + ","
        		+ "\"smoke_level\" :" + smokeLevel + ","
        		+ "\"carbondioxide_level\" :" + carbondioxideLevel + ","
        		+ "\"sensor_status\" :" + "\"ACTIVE\"" + ","
        		+ "\"owner_name\" :" + "\"Saman Kodithuwakku\"" + ","
        		+ "\"email\" :" + "\"samanKad@gmail.com\"" + ","
        		+ "\"phone_number\" :" + "\"0765387608\"" 
        		+ "}";
		
		System.out.println(jsonString);

	}
	
	//send data to the REST API
	public static JSONObject sendSensorData() throws IOException, JSONException, ParseException  {
		String query = "http://localhost:3000/sensorRecord";
		String jsonString = "{"
        		+ "\"floor_no\" : "+ floorNum + ","
        		+ "\"room_no\" : " + roomNum + ","
        		+ "\"smoke_level\" :" + smokeLevel + ","
        		+ "\"carbondioxide_level\" :" + carbondioxideLevel + ","
        		+ "\"sensor_status\" :" + "\"ACTIVE\"" 
        		+ "}";

        URL url = new URL(query);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(5000);
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestMethod("PUT");

		try (OutputStream os = conn.getOutputStream()) {
			byte[] input = jsonString.getBytes("utf-8");
			os.write(input, 0, input.length);
			os.close();
		}

        // read the response
        InputStream in = new BufferedInputStream(conn.getInputStream());
        String result = org.apache.commons.io.IOUtils.toString(in, "UTF-8");
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(result);


        in.close();
        conn.disconnect();

        return jsonObject;
	}

	/**
	 * Create the frame.
	 * @return 
	 */
	public SensorAppGUI() {
		setTitle("Sensor App");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 400, 300);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JLabel lblFloor = new JLabel("Floor      :   ");
		lblFloor.setFont(new Font("Tahoma", Font.BOLD, 18));
		lblFloor.setBounds(85, 69, 107, 46);
		contentPane.add(lblFloor);
		
		JLabel lblRoom = new JLabel("Room     :   ");
		lblRoom.setFont(new Font("Tahoma", Font.BOLD, 18));
		lblRoom.setBounds(85, 116, 107, 46);
		contentPane.add(lblRoom);
		
		JLabel floorNumlbl = new JLabel("12");
		floorNumlbl.setFont(new Font("Tahoma", Font.BOLD, 18));
		floorNumlbl.setBounds(199, 84, 56, 16);
		contentPane.add(floorNumlbl);
		this.floorNum = Integer.parseInt(floorNumlbl.getText());
		
		JLabel roomNumlbl = new JLabel("64");
		roomNumlbl.setFont(new Font("Tahoma", Font.BOLD, 18));
		roomNumlbl.setBounds(199, 133, 56, 16);
		contentPane.add(roomNumlbl);
		this.roomNum = Integer.parseInt(roomNumlbl.getText());
		
	}
}
