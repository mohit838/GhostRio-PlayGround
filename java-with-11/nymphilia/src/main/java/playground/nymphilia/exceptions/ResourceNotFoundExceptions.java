package playground.nymphilia.exceptions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ResourceNotFoundExceptions extends RuntimeException{
    String resourceName;
    String resourceField;
    long resourceValue;

    public ResourceNotFoundExceptions(String resourceName, String resourceField, long resourceValue) {
        super(String.format("%s Not Found With %s: %l", resourceName, resourceField, resourceValue));
        this.resourceName = resourceName;
        this.resourceField = resourceField;
        this.resourceValue = resourceValue;
    }
}
