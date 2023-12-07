
param deploymentLocation string = resourceGroup().location

resource serviceBusNamespace 'Microsoft.ServiceBus/namespaces@2021-06-01-preview' = {
  name: 'sbns-sixpivot-cbh'
  location: deploymentLocation
  sku: {
    name: 'Standard'
    capacity: 1
    tier: 'Standard'
  }
}

resource serviceBusTopic 'Microsoft.ServiceBus/namespaces/topics@2022-10-01-preview' = {
  name: 'customer'
  parent: serviceBusNamespace
  properties: {
    defaultMessageTimeToLive: 'PT4H'
    supportOrdering: true
  }
}


resource serviceBusSubscriptionMale 'Microsoft.ServiceBus/namespaces/topics/subscriptions@2022-10-01-preview' = {
  name: 'consumer-male'
  parent: serviceBusTopic

  resource rule 'rules@2022-10-01-preview' = {
    name: 'filter-male'
    properties: {
      filterType: 'SqlFilter'
      sqlFilter: {
        requiresPreprocessing: false
        sqlExpression: 'gender = \'male\''
      }
    }
  }
}

resource serviceBusSubscriptionFemale 'Microsoft.ServiceBus/namespaces/topics/subscriptions@2022-10-01-preview' = {
  name: 'consumer-female'
  parent: serviceBusTopic

  resource rule 'rules@2022-10-01-preview' = {
    name: 'filter-female'
    properties: {
      filterType: 'SqlFilter'
      sqlFilter: {
        requiresPreprocessing: false
        sqlExpression: 'gender = \'female\''
      }
    }
  }
}

resource serviceBusSubscriptionOther 'Microsoft.ServiceBus/namespaces/topics/subscriptions@2022-10-01-preview' = {
  name: 'consumer-all'
  parent: serviceBusTopic
}

output sbns string = serviceBusNamespace.name
