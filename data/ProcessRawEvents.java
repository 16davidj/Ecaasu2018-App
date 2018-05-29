
import java.util.*;
import java.io.*;
import java.lang.Comparable;

public class ProcessRawEvents {

  public static class Event implements Comparable<Event> {
    int id;
    String title;
    String speaker;
    String location;
    String timeSlot;
    String description;

    public Event(int id) {
      this.id = id;
    }

    public int compareTo(Event e) {
      return e.timeSlot.compareTo(this.timeSlot);
    }

    public String toString() {
      return "{" + 
        "\"key\":\"" + id +
        "\",\"title\":\"" + title +
        "\",\"speaker\":\"" + speaker +
        "\",\"location\":\"" + location +
        "\",\"timeSlot\":" + timeSlot +
        ",\"description\":\"" + description + 
      "\"}";
    }
  }

  public static void main(String[] args) throws IOException {
    BufferedReader in = new BufferedReader(new FileReader(new File("events.csv")));
    PrintWriter out = new PrintWriter(new FileWriter(new File("events_processed.json")));

    String line = in.readLine();
    String[] res;

    int id = 0;
    ArrayList<Event> events = new ArrayList<Event>();

    // load from csv
    while(line!=null){
      res = line.split("[|]");

      Event e = new Event(id++);
      e.title = res[0].trim();
      e.location = res[1].trim();
      e.speaker = res[2].trim();
      e.timeSlot = res[3].trim();

      String descript = "";
      for(int i = 4; i < res.length-1; i++){
        descript = descript = descript + res[i] + "\\n\\n";
      }
      descript = descript + res[res.length-1];
      e.description = descript.replaceAll("\"","\\\\\"");

      events.add(e);

      line = in.readLine();
    }
    in.close();

    // sort
    Event[] sorted = new Event[events.size()];
    for(int i = 0; i < sorted.length; i++){
      sorted[i] = events.get(i);
    }
    Arrays.sort(sorted);

    // print out in json format
    out.println("{ \"events\":[");
    for(int i = 0; i < sorted.length - 1; i++){
      out.print(sorted[i]);
      out.println(",");
    }
    out.println(sorted[sorted.length-1]);
    out.println("]}");
    out.close();
  }
}

