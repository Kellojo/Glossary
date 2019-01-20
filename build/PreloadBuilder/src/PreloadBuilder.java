import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public class PreloadBuilder {
	
	private static String ending = ".fragment.html";

	public static void main(String[] args) throws IOException {
		
		try {
			System.out.println("Preload Builder 1.0");
			System.out.println("Starting...");
			
			if (args.length > 1 && args[0] != "" && args[1] != "") {
				
				Path localDir = resolveRelativePath(args[0]);
				System.out.println("Building Preloads for " + localDir);
				String preloads = generatePreloadString(localDir);
				System.out.println(preloads);
				
				Path destination = resolveRelativePath(args[1]);
				BufferedWriter writer = new BufferedWriter(new FileWriter(destination.toString()));
			    writer.write(preloads);
			    writer.close();
				
			} else {
				System.err.println("Could not build preloads, please specify a relative root path");
			}
		} catch(NoSuchFileException e) {
			System.err.println("The given path could not be located");
		}

	}
	
	private static String generatePreloadString(Path directory) throws IOException {
		List<Path> fragments = getAllFilesInDirectoryWithEnding(directory, ending);
		String jsonObject = "{\n";
		int i = 0;
		
		//create preloads
		for(Path path : fragments) {
			String fragment = "";
			try {
				fragment = readAllFileContends(path);
			} catch (IOException e) {
				System.err.println("Could not read file '" + path.toString() + "'");
			}
			
			//reading worked fine
			String minimizedFragment = minimizeFragment(fragment);
			jsonObject += "\"" + path.getFileName().toString().replace(ending, "") + "\"" + ": \"" + minimizedFragment + "\"";
			
			i++;
			if (i < fragments.size()) {
				jsonObject += ",\n";
			} else {
				jsonObject +="\n";
			}
			
			System.out.println("Minimized " + path.getFileName());
		}
		
		jsonObject += "}";
		
		return jsonObject;
	}
	
    private static List<Path> getAllFilesInDirectoryWithEnding(Path directory, String ending) throws IOException {
        return Files.walk(Paths.get(directory.toString()))
                    .filter(p -> p.toString().endsWith(ending))
                    .collect(Collectors.toList());
    }
    private static String readAllFileContends(Path path) throws IOException {
    	String fileContent = "";
    	List<String> fileContents = Files.readAllLines(path, StandardCharsets.UTF_8);
    	for(String line :fileContents) {
    		fileContent += line;
    	}
    	
    	return fileContent;
    }
    private static Path resolveRelativePath(String relativePath) {
    	String localDir = System.getProperty("user.dir");
		Path myDir = Paths.get(localDir);
		Path target = myDir.resolve(relativePath);
		return target;
    }
 
    private static String minimizeFragment(String fragment) {
    	return fragment.replace("\"", "'").replace("\n", "");
    }
}
