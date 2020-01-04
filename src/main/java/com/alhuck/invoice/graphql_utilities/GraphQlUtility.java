package com.alhuck.invoice.graphql_utilities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

//import graphql.GraphQL;

@Component
public class GraphQlUtility {

	@Value("classpath:schemas.graphqls")
	private Resource schemaResource;
//	private GraphQL graphQL;	
}
