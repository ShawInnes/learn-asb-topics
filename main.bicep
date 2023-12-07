
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
  name: 'string'
  parent: serviceBusNamespace
  properties: {
    defaultMessageTimeToLive: 'PT4H'
    supportOrdering: true
  }
}

output sbns string = serviceBusNamespace.name
